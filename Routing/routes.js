const router = require('express').Router()
const db = require('../DB/db')
const { hashPassword, comparePassword } = require('../DB/hashing/auth')
const User = require('../DB/models/users')
const Maths = require('../DB/models/subjects/maths')
const Chemistry = require('../DB/models/subjects/chemistry')
const Physics = require('../DB/models/subjects/physics')
const Biology = require('../DB/models/subjects/biology')
const Computer = require('../DB/models/subjects/computer')
const scores = require('../DB/models/scores')


router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    req.session.username = username;
    try {
        const user = await User.findOne({
            username
        });
        if (user) {
            const isMatch = await comparePassword(password, user.password);
            if (isMatch) {
                req.session.user = user;
                res.redirect('/')
            } else {
                res.redirect('/login')
            }
        } else {
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error);
        res.redirect('/login')
    }
})

router.post('/signup', async (req, res) => {
    const { fullname, username, email, password, 'con-password': confirmPassword } = req.body;

    if (!fullname || !username || !email || !password || !confirmPassword) {
        return res.redirect('/signup');
    }

    if (password !== confirmPassword) {
        return res.redirect('/signup');
    }

    try {
        const user = new User({
            fullname,
            username,
            email,
            password: await hashPassword(password)
        });
        await user.save();
        res.redirect('/login');
    } catch (error) {
        console.log(error);
        res.redirect('/signup');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
})

router.use((req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.redirect('/login')
    }
})

router.get('/', async (req, res) => {
    const usersDetails = await User.findOne({ username: req.session.username });

    const userScore = await scores.findOne({ username: req.session.username });
    if (!userScore) {
        const newScore = new scores({
            username: req.session.username,
            avgscore: 0,
            testtaken: 0
        });
        await newScore.save();
        res.render('home', { username: req.session.username , avgScore: `0 %`, fullname: usersDetails.fullname, email: usersDetails.email });
    } else {
        res.render('home', { username: req.session.username , avgScore: `${userScore.avgscore} %`,  fullname: usersDetails.fullname, email: usersDetails.email });
    }    
})

router.post('/', (req, res) => {
    const { subject, form, quizes } = req.body;

    req.session.subject = subject;
    req.session.form = form;
    req.session.quizes = quizes;

    res.redirect('/quiz')
})

router.get('/quiz', async (req, res) => {
    const { subject, form, quizCount } = req.session;

    let subjectModel;
    switch (subject) {
        case 'Math':
            subjectModel = Maths;
            break;
        case 'Chemistry':
            subjectModel = Chemistry;
            break;
        case 'Physics':
            subjectModel = Physics;
            break;
        case 'Biology':
            subjectModel = Biology;
            break;
        case 'Computer':
            subjectModel = Computer;
            break;
        default:
            console.error('Invalid subject');
            res.redirect('/');
            return;
    }

    try {
        const data = [];
        let quizes;

        if (subject && form) {
            quizes = await subjectModel.find({ form });
        } else {
            quizes = await subjectModel.find();
        }

        const count = quizCount && quizes.length > quizCount ? quizCount : quizes.length;
        for (let i = 0; i < count; i++) {
            data.push(quizes[i]);
        }

        if (data.length === 0) {
            console.warn('No quizzes found for the given criteria.');
        }

        req.session.data = data;
        res.render('quize', { data });
    } catch (err) {
        console.error('Error fetching quizzes:', err);
        res.redirect('/');
    }
});

router.post('/quiz', async (req, res) => {
    const { data } = req.session;
    const answers = Object.entries(req.body);

    if (!data || !answers) {
        console.error('No data or answers found.');
        res.redirect('/');
        return;
    }

    let score = 0;
    let totalMarks = 0;
    for (let i = 0; i < answers.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if (answers[i][0] === data[j]._id.toString() && answers[i][1] === data[j].answer) {
                score += data[j].marks;
            }
        }
    }
    for (let j = 0; j < data.length; j++) {
        totalMarks += data[j].marks;
    }
    const userScore = await scores.findOne({ username: req.session.username });
    let testtaken = userScore.testtaken;
    let percentage = (score / totalMarks) * 100;
    let currentAvg = userScore.avgscore;
    let updatedAvg = ((currentAvg * testtaken) + percentage) / (testtaken + 1);
    testtaken += 1;
    const avgscore = updatedAvg.toFixed(2);
    await scores.updateOne({ username: req.session.username }, { avgscore, testtaken });

    res.redirect('/');
});


module.exports = router
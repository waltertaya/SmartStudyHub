const router = require('express').Router()
const db = require('../DB/db')
const { hashPassword, comparePassword } = require('../DB/hashing/auth')
const User = require('../DB/models/users')
const Maths = require('../DB/models/subjects/maths')
const Chemistry = require('../DB/models/subjects/chemistry')
const Physics = require('../DB/models/subjects/physics')
const Biology = require('../DB/models/subjects/biology')
const Computer = require('../DB/models/subjects/computer')


router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
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


// Ensure login is required for all routes
// router.use((req, res, next) => {
//     if (req.session.user) {
//         next()
//     } else {
//         res.redirect('/login')
//     }
// })

router.get('/', (req, res) => {
    res.render('home', { username:'waltertaya', avgScore: '50%' })
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

        // console.log('Query Parameters:', { subject, form });
        // console.log('Quizes:', quizes);
        // console.log('Data:', data);

        if (data.length === 0) {
            console.warn('No quizzes found for the given criteria.');
        }

        res.render('quize', { data });
    } catch (err) {
        console.error('Error fetching quizzes:', err);
        res.redirect('/');
    }
});


module.exports = router
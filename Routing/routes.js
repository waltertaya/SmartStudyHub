const router = require('express').Router()
const db = require('../DB/db')
const { hashPassword, comparePassword } = require('../DB/hashing/auth')
const User = require('../DB/models/users')


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

    if (!fullname || !username || !email || !password || !confirmPassword || password !== confirmPassword) {
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

router.get('/quiz', (req, res) => {
    res.render('quize', { questions: [
        {
            question: 'What is the capital of Nigeria?',
            options: ['Lagos', 'Abuja', 'Kano', 'Ibadan'],
            answer: 'Abuja'
        },
        {
            question: 'What is the capital of Ghana?',
            options: ['Accra', 'Kumasi', 'Tamale', 'Takoradi'],
            answer: 'Accra'
        },
        {
            question: 'What is the capital of Kenya?',
            options: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru'],
            answer: 'Nairobi'
        },
        {
            question: 'What is the capital of South Africa?',
            options: ['Johannesburg', 'Cape Town', 'Pretoria', 'Durban'],
            answer: 'Pretoria'
        },
        {
            question: 'What is the capital of Egypt?',
            options: ['Cairo', 'Alexandria', 'Giza', 'Luxor'],
            answer: 'Cairo'
        },
        {
            question: 'What is the capital of Morocco?',
            options: ['Rabat', 'Casablanca', 'Marrakesh', 'Fes'],
            answer: 'Rabat'
        },
        {
            question: 'What is the capital of Algeria?',
            options: ['Algiers', 'Oran', 'Constantine', 'Annaba'],
            answer: 'Algiers'
        },
        {
            question: 'What is the capital of Tunisia?',
            options: ['Tunis', 'Sfax', 'Sousse', 'Kairouan'],
            answer: 'Tunis'
        },
        {
            question: 'What is the capital of Libya?',
            options: ['Tripoli', 'Benghazi', 'Misrata', 'Zawiya'],
            answer: 'Tripoli'
        },
        {
            question: 'What is the capital of Sudan?',
            options: ['Khartoum', 'Omdurman', 'Port Sudan', 'Kassala'],
            answer: 'Khartoum'
        }
    ]})
})

module.exports = router
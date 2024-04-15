const router = require('express').Router()


router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

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
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

module.exports = router
const router = require("express").Router();
const UserModel = require('../models/User.model')

router.get('/profile', (req, res, next) => {
    res.render('../views/profile/profile.hbs', {layout: 'logged-in-layout.hbs'})
})

router.get('/profile/edit', (req, res, next) => {
    res.render('../views/profile/edit-profile.hbs', {layout: 'logged-in-layout.hbs'})
})






module.exports = router;
const router = require("express").Router();
const UserModel = require('../models/User.model')
require('../routes/auth.routes')

router.get('/profile', (req, res, next) => {
    let userInfo = req.session.myProperty
    res.render('../views/profile/profile.hbs', {name: userInfo.name} )
})

router.get('/profile/edit', (req, res, next) => {
    res.render('../views/profile/edit-profile.hbs', {layout: 'logged-in-layout.hbs'})
})






module.exports = router;
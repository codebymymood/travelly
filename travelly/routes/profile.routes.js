const router = require("express").Router();
const UserModel = require('../models/User.model')
const FavTrips = require("../models/favTrips.model");
require('../routes/auth.routes')

router.get('/profile', (req, res, next) => {
    let userInfo = req.session.myProperty
    res.render('../views/profile/profile.hbs', {name: userInfo.name} )
})

router.post('/profile', (req, res, next) => {

    const {destination, start, end} = req.body

    FavTrips.create({destination, start, end})
    .then(() => {
        res.redirect('/profile')
    })
    .catch((err) => {
        next(err)
    })

})

router.get('/profile/edit', (req, res, next) => {
    res.render('../views/profile/edit-profile.hbs', {layout: 'logged-in-layout.hbs'})
})






module.exports = router;
const router = require("express").Router();
const UserModel = require('../models/User.model')

router.get('/profile', (res, req, next) => {
    res.render('edit-profile.hbs')
})






module.exports = router;
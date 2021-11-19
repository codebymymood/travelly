const router = require("express").Router();
const UserModel = require('../models/User.model')

router.get('/profile', (res, req, next) => {
    res.render('/profile/edit-profile.hbs')
})






module.exports = router;
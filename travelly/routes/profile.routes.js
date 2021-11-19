const router = require("express").Router();
const UserModel = require('../models/User.model')

router.get('/profile/edit', (req, res, next) => {
    res.render('../views/profile/edit-profile.hbs')
})






module.exports = router;
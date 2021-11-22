const router = require("express").Router();
const UserModel = require('../models/User.model')
const FavTrips = require("../models/favTrips.model");
const uploader = require('../middlewares/cloudinary.config.js');
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

router.get('/profile/edit',  (req, res, next) => {

    UserModel.findById(req.session.myProperty._id)
    .then((result)=> {
    console.log(result.image)
        res.render('../views/profile/edit-profile.hbs', {layout: 'logged-in-layout.hbs', image: result.image})
    })
    .catch((err) => {
        next(err)
    })


})

router.post('/profile/edit/upload', uploader.single("imageUrl"), (req, res, next) => {
    console.log(req.file.path)

    UserModel.findByIdAndUpdate(req.session.myProperty._id, {image: req.file.path })
    .then(()=> {

        res.redirect('/profile');
    })
    .catch((err) => {
        next(err)
    })

})

module.exports = router;
const router = require("express").Router();
const UserModel = require('../models/User.model')
const FavTrips = require("../models/favTrips.model");
const uploader = require('../middlewares/cloudinary.config.js');

const isLogged = (req, res, next) => {
    req.session.myProperty ? next() : res.redirect('/auth')
}

router.get('/profile', isLogged, (req, res, next) => {
    let userInfo = req.session.myProperty
    res.render('profile/profile.hbs', {layout:'logged-in-layout.hbs', name: userInfo.name} )
})

router.post('/profile', (req, res, next) => {
    
    const {destination, start, end} = req.body

    FavTrips.create({destination, start, end})
    .then(() => {
        res.redirect('/mytrips')
    })
    .catch((err) => {
        next(err)
    })

})

router.get('/profile/edit', isLogged, (req, res, next) => {
    UserModel.findById(req.session.myProperty._id)
    .then((result)=> {
    console.log(result.image)
        res.render('profile/edit-profile.hbs', {layout: 'logged-in-layout.hbs', name: req.session.myProperty.name, image: result.image})
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
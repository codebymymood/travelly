const router = require("express").Router();


const isLogged = (req, res, next) => {
    req.session.myProperty ? next() : res.redirect('/auth')
}

router.get("/flights", isLogged, (req, res, next) => {
    let userInfo = req.session.myProperty;
    res.render('trips/flights.hbs' , {username: userInfo.name, layout:'logged-in-layout.hbs'});
});

module.exports = router;
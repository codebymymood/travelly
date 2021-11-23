const router = require("express").Router();

const isLogged = (req, res, next) => {
    req.session.myProperty ? next() : res.redirect('/auth')
}

router.get("/flights", isLogged, (req, res, next) => {
    res.render('../views/trips/flights.hbs' , {layout:'logged-in-layout.hbs'});
});

module.exports = router;
const router = require("express").Router();

router.get("/flights", (req, res, next) => {
    res.render('../views/trips/flights.hbs' , {layout:'logged-in-layout.hbs'});
});

module.exports = router;
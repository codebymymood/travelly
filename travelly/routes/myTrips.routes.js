const router = require("express").Router();
const axios = require('axios')

const OPENTRIP_KEY = process.env.API_KEY

router.get("/mytrips", (req, res, next) => {
    res.render('../views/trips/mytrips.hbs' , {layout:'logged-in-layout.hbs'});
  });

router.get("/mytrips/destination", (req, res, next) => {
    res.render('../views/trips/destinations.hbs' , {layout:'logged-in-layout.hbs'});
});

router.get("/mytrips/destination/map", (req, res, next) => {
  let loc = [51.505, -0.09]

  res.render('../views/trips/activities.hbs' , {loc: JSON.stringify(loc), layout:'logged-in-layout.hbs'});
});








module.exports = router;
const router = require("express").Router();
const axios = require('axios')

const OPENTRIP_KEY = process.env.API_KEY

router.get("/mytrips", (req, res, next) => {
    res.render('../views/trips/mytrips.hbs');
  });
  
router.post("/mytrips", (req, res, next) => {
 const city = req.body.city
 console.log(city)
    axios.get(`https://api.opentripmap.com/0.1/en/places/geoname?name=${city}}&apikey=5ae2e3f221c38a28845f05b663d6442a707b83ae2816fa50a8844e82`)
      .then((response) => { 
          let joana = response.data.name
          res.render('../views/trips/mytrips.hbs' , {joana})
      })
      .catch((err) => {
          next(err)
      })

});




module.exports = router;
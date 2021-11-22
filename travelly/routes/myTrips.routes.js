const router = require("express").Router();
const axios = require('axios')
const CitiesModel = require('../models/Cities.model')

const OPENTRIP_KEY = process.env.API_KEY

router.get("/mytrips", (req, res, next) => {
  let city1 = CitiesModel[Math.floor(Math.random()*CitiesModel.length)]
  let city2 = CitiesModel[Math.floor(Math.random()*CitiesModel.length)]
  let city3 = CitiesModel[Math.floor(Math.random()*CitiesModel.length)]
  
  res.render('../views/trips/mytrips.hbs', {city1, city2, city3} );
});
  
router.post("/mytrips", (req, res, next) => {
 const city = req.body.city
 console.log(city)

    axios.get(`https://api.opentripmap.com/0.1/en/places/geoname?name=${city}}&apikey=5ae2e3f221c38a28845f05b663d6442a707b83ae2816fa50a8844e82`)
      .then((response) => { 
          let joana = response.data.name
          let lat = response.data.lat
          let long = response.data.long      
          
          let city1 = { name: joana, lat: lat, long: long};   

          let city2 = CitiesModel[Math.floor(Math.random()*CitiesModel.length)]
          let city3 = CitiesModel[Math.floor(Math.random()*CitiesModel.length)]
          
          res.render('../views/trips/mytrips.hbs' , {city1, city2, city3})
      })
      .catch((err) => {
          next(err)
      })

});

  

module.exports = router;
const router = require("express").Router();
const axios = require('axios')

const OPENTRIP_KEY = process.env.API_KEY



let cities = [
  { name: "BRazil", lat: 123, lon: 456 },
  { name: "USA", lat: 123, lon: 456 },
  { name: "Cuba", lat: 123, lon: 456 },  
];

router.get("/mytrips", (req, res, next) => {
  let city1 = cities[Math.floor(Math.random()*cities.length)]
  let city2 = cities[Math.floor(Math.random()*cities.length)]
  let city3 = cities[Math.floor(Math.random()*cities.length)]
  
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

          let city2 = cities[Math.floor(Math.random()*cities.length)]
          let city3 = cities[Math.floor(Math.random()*cities.length)]
          
          res.render('../views/trips/mytrips.hbs' , {city1, city2, city3})
      })
      .catch((err) => {
          next(err)
      })

});

  

module.exports = router;
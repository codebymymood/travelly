const router = require("express").Router();
const axios = require('axios')
const CitiesModel = require('../models/Cities.model')
const ReminderModel = require('../models/Reminder.model')
const isLogged = (req, res, next) => {
  req.session.myProperty ? next() : res.redirect('/auth')
}
const OPENTRIP_KEY = process.env.API_KEY

let cities = [CitiesModel];

router.get("/mytrips", isLogged,(req, res, next) => {
  let city1 = cities[Math.floor(Math.random()*cities.length)]
  let city2 = cities[Math.floor(Math.random()*cities.length)]
  let city3 = cities[Math.floor(Math.random()*cities.length)]


      CitiesModel.find()
      .then((result) => {
        let nameResults = []
        let nameResults0 = []
        let nameResults2 = []
        let nameResults3 = []
        let nameResults4 = []
        let nameResults5 = []
        let nameResults6 = []
        let nameResults7 = []

        
        console.log(nameResults2)
        for (let i = 0; i < result.length; i++) {
         nameResults.push(result[i])

        }

        res.render('../views/trips/mytrips.hbs',{layout:'logged-in-layout.hbs', nameResults0:nameResults.slice(0,3),nameResults2:nameResults.slice(3,6), nameResults3:nameResults.slice(6,9), nameResults4:nameResults.slice(9,12), nameResults5:nameResults.slice(12,15), nameResults6:nameResults.slice(15,18), nameResults7:nameResults.slice(18,21),});
      })
      .catch((err) => {
        next(err)
      })
  
});

router.post("/mytrips", (req, res, next) => {
  const city = req.body.city
  console.log(city)
 
     axios.get(`https://api.opentripmap.com/0.1/en/places/geoname?name=${city}}&apikey=5ae2e3f221c38a28845f05b663d6442a707b83ae2816fa50a8844e82`)
       .then((response) => { 
           let cityname = response.data.name
           let lat = response.data.lat
           let long = response.data.long      
           
           let city1 = { name: cityname, lat: lat, long: long};    
           let city2 = cities[Math.floor(Math.random()*cities.length)];
           let city3 = cities[Math.floor(Math.random()*cities.length)];
           
           res.render('../views/trips/mytrips.hbs', {layout: 'logged-in-layout.hbs', city1, city2, city3})
       })
       .catch((err) => {
           next(err)
       })
 
 }); 

router.get('/mytrips/:name/:lat/:long', isLogged, (req, res, next) => { ///mytrips/:name/:lat/:long
  const {name, lat, long} = req.params;

  axios.get(`https://api.opentripmap.com/0.1/en/places/radius?lat=${lat}&lon=${long}&radius=5000&apikey=5ae2e3f221c38a28845f05b663d6442a707b83ae2816fa50a8844e82`)
  .then((response) => {
    let attractionName = response.data.features
    let attractArr = []
    for (let i = 0; i < 19; i++) {
      attractArr.push(attractionName[i].properties.name)
    }
   console.log(attractArr)
    res.render('../views/trips/destinations.hbs', {layout:'logged-in-layout.hbs', attractArr})
  })
  .catch((err) => {
    next(err)
  })

});

router.get("/mytrips/destination/map", isLogged, (req, res, next) => {
let loc = [51.5, -0.09] //mudar p variavel
res.render('../views/trips/activities.hbs' , {loc: JSON.stringify(loc), layout:'logged-in-layout.hbs'});
});

module.exports = router;
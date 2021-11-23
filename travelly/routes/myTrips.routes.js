const router = require("express").Router();
const axios = require('axios')
const CitiesModel = require('../models/Cities.model')
const ReminderModel = require('../models/Reminder.model')

const OPENTRIP_KEY = process.env.API_KEY

let cities = [CitiesModel];

router.get("/mytrips", (req, res, next) => {
  let city1 = cities[Math.floor(Math.random()*cities.length)]
  let city2 = cities[Math.floor(Math.random()*cities.length)]
  let city3 = cities[Math.floor(Math.random()*cities.length)]


      CitiesModel.find()
      .then((result) => {
        let nameResults = []

        for (let i = 0; i < result.length; i++) {
         nameResults.push(result[i])
        }

        res.render('../views/trips/mytrips.hbs',{layout:'logged-in-layout.hbs', nameResults});
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

router.get('/mytrips/:name/:lat/:long', (req, res, next) => {
  const {name, lat, long} = req.params;

  axios.get(`https://api.opentripmap.com/0.1/en/places/radius?lat=${lat}&lon=${long}&radius=5000&apikey=5ae2e3f221c38a28845f05b663d6442a707b83ae2816fa50a8844e82`)
  .then((response) => {
    let attractionName = response.data.features
    let attractArr = []
    for (let i = 0; i < 19; i++) {
      attractArr.push(attractionName[i].properties.name)
    }
   
    res.render('../views/trips/destinations.hbs', {attractArr})
  })
  .catch((err) => {
    next(err)
  })
  

})

// router.post('/mytrips/:name/:lat/:long', async(req, res, next) => {
// const {description} = req.body 

//   try {
//     let newReminder = ReminderModel.create(description)
//     res.render()
//   }
  

// })


module.exports = router;
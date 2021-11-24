const router = require("express").Router();
const axios = require('axios')
const CitiesModel = require('../models/Cities.model')
const ReminderModel = require('../models/Reminder.model')
const FavTripsModel = require('../models/favTrips.model')
const isLogged = (req, res, next) => {
  req.session.myProperty ? next() : res.redirect('/auth')
}
const OPENTRIP_KEY = process.env.API_KEY

let cities = [CitiesModel];

router.get("/mytrips", isLogged,(req, res, next) => {
  let userInfo = req.session.myProperty
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

      
        for (let i = 0; i < result.length; i++) {
         nameResults.push(result[i])

        }

        res.render('trips/mytrips.hbs',{name: userInfo.name, layout:'logged-in-layout.hbs', nameResults0:nameResults.slice(0,3), nameResults2:nameResults.slice(3,6), nameResults3:nameResults.slice(6,9), nameResults4:nameResults.slice(9,12), nameResults5:nameResults.slice(12,15), nameResults6:nameResults.slice(15,18), nameResults7:nameResults.slice(18,21)});
      })
      .catch((err) => {
        next(err)
      })
  
});

router.post("/mytrips", (req, res, next) => {
  const city = req.body.city
  
     axios.get(`https://api.opentripmap.com/0.1/en/places/geoname?name=${city}}&apikey=5ae2e3f221c38a28845f05b663d6442a707b83ae2816fa50a8844e82`)
       .then((response) => { 
                  
           res.render('trips/mytrips.hbs', {layout: 'logged-in-layout.hbs'})
       })
       .catch((err) => {
           next(err)
       })
 
 }); 

router.get('/mytrips/:name/:lat/:long', isLogged, (req, res, next) => { 
  const {name, lat, long} = req.params;

  axios.get(`https://api.opentripmap.com/0.1/en/places/radius?lat=${lat}&lon=${long}&radius=5000&apikey=5ae2e3f221c38a28845f05b663d6442a707b83ae2816fa50a8844e82`)
  .then((response) => {
    let attractionName = response.data.features
    let attractArr = []
    let attractArr0 = []
    let attractArr1 = []
    let attractArr2 = []
    let attractArr3 = []
    let attractArr4 = []
    let attractArr5 = []
    let attractArr6 = []
    
    // console.log(attractionName)

    for (let i = 0; i < 100; i++) {
      
      if(attractionName[i].properties.name !== '' && attractArr.includes(attractionName[i].properties.name) == false && attractArr.length < 20) {
        attractArr.push(attractionName[i].properties.name)
      }
      
    }
    
    res.render('trips/destinations.hbs', {name,lat, long, layout:'logged-in-layout.hbs', attractArr0:attractArr.slice(0,3), attractArr1:attractArr.slice(3,6), attractArr2:attractArr.slice(6,9), attractArr3:attractArr.slice(9,12), attractArr4:attractArr.slice(12,15), attractArr5:attractArr.slice(15,18), attractArr6:attractArr.slice(18,21)})
   
  })
  .catch((err) => {
    next(err)
  })

  // const {description} = req.body 
  // ReminderModel.find(description)
  // .then (() => {
  //   res.render('../views/trips/description.hbs', {description})
  // })
  // .catch((err) =>{
  //   next(err)
  // })


});


router.post('/mytrips/:name/:lat/:long', async(req, res, next) => {
  //THIS IS FOR MAKING THE REMINDERS LIST WORK
  const {reminder} = req.body 
  const {name, lat, long} = req.params
  console.log(req.body)
  try {
    let favTripId = await FavTripsModel.findOne({})
    let newReminder = await ReminderModel.create({description: reminder})

    res.redirect(`/mytrips/${name}/${lat}/${long}`)
  }
  catch(err) {
    next(err)
  }



  //THIS IS FOR MAKING THE ADD-ON ACTIVITIES WORK



})

router.get("/mytrips/destination/map", isLogged, (req, res, next) => {
let loc = [51.5, -0.09] //mudar p variavel
res.render('trips/activities.hbs' , {loc: JSON.stringify(loc), layout:'logged-in-layout.hbs'});
});




module.exports = router;
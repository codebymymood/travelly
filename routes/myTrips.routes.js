const router = require("express").Router();
const axios = require('axios');
const CitiesModel = require('../models/Cities.model');
const ReminderModel = require('../models/Reminder.model');
const FavTripsModel = require('../models/favTrips.model');
const { populate } = require("../models/favTrips.model");

const isLogged = (req, res, next) => {
  req.session.myProperty ? next() : res.redirect('/auth')
}

const OPENTRIP_KEY = process.env.API_KEY

let cities = [CitiesModel];

router.get("/mytrips", isLogged,(req, res, next) => {
  let userInfo = req.session.myProperty

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

        res.render('trips/mytrips.hbs',{username: userInfo.name, layout:'logged-in-layout.hbs', nameResults0:nameResults.slice(0,3), nameResults2:nameResults.slice(3,6), nameResults3:nameResults.slice(6,9), nameResults4:nameResults.slice(9,12), nameResults5:nameResults.slice(12,15), nameResults6:nameResults.slice(15,18), nameResults7:nameResults.slice(18,21)});
      })
      .catch((err) => {
        next(err)
      })
  
})

router.post("/mytrips", (req, res, next) => {
  const city = req.body.city

     axios.get(`https://api.opentripmap.com/0.1/en/places/geoname?name=${city}}&apikey=5ae2e3f221c38a28845f05b663d6442a707b83ae2816fa50a8844e82`)
       .then((response) => {
                  
           res.render('trips/mytrips.hbs', {layout: 'logged-in-layout.hbs'})
       })
       .catch((err) => {
           next(err)
       })

 })

router.get('/mytrips/:name/:lat/:long/:start/:end', isLogged, (req, res, next) => { 
  const {name, lat, long, start, end} = req.params;
  let userInfo = req.session.myProperty;
  let description = []
  let activities = []

  FavTripsModel.findOne({userId: req.session.myProperty._id})
     .populate('reminder')
     .then((result) => {
      console.log(result.activites, "those are the activities")
      if (!result.activities) {
        result.activities = [""]
      }
      result.activities.forEach((act) => {          
        activities.push(act)
      })

      result.reminder.forEach((reminder) => {          
        description.push(reminder.description)
      })

     })
     .catch((err) => {
      next(err)
     })

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
    
    

    for (let i = 0; i < 100; i++) {
      
      if(attractionName[i].properties.name !== '' && attractArr.includes(attractionName[i].properties.name) == false && attractArr.length < 20) {
        attractArr.push(attractionName[i].properties.name) //, lat:123, long:456
      }
      
    }   
   
    res.render('trips/destinations.hbs', {username: userInfo.name, name, lat, long, start, end, description, activities, layout:'logged-in-layout.hbs', attractArr0:attractArr.slice(0,3), attractArr1:attractArr.slice(3,6), attractArr2:attractArr.slice(6,9), attractArr3:attractArr.slice(9,12), attractArr4:attractArr.slice(12,15), attractArr5:attractArr.slice(15,18), attractArr6:attractArr.slice(18,21)})
   
  })
  .catch((err) => {
    next(err)
  })
 
       
  
})


router.post('/mytrips/:name/:lat/:long/:start/:end', async(req, res, next) => {
  //THIS IS FOR MAKING THE REMINDERS LIST WORK
  const {name, lat, long, start, end} = req.params
  
  const {reminder} = req.body
  
  
  
    try {

           
      
      let newReminder = await ReminderModel.create({description: reminder})
      
      let updateFavTrip = await FavTripsModel.findOneAndUpdate({userId: req.session.myProperty._id}, {$push:{reminder:newReminder._id}})
      
      res.redirect(`/mytrips/${name}/${lat}/${long}/${start}/${end}`)
    }
    catch(err) {
      next(err)
    }  

});
  

router.post('/mytrips/favtrips', (req, res, next) => {
  const {destination, start, end} = req.body
  const {_id} = req.session.myProperty
  console.log(req.session.myProperty)

  FavTripsModel.create({destination, start, end, userId: _id})
  .then(()=>{
        CitiesModel.find({name:destination})
        .then((result)=>{
          const {name, lat, long} = result[0]
          res.redirect(`/mytrips/${name}/${lat}/${long}/${start}/${end}`)
        })
        .catch((error)=>{
          next(error)
        })
 
  })
  .catch((error)=>{
     next(error)
  })


})



router.post('/mytrips/activities', (req, res, next) => {

  let name = req.body.activities
  let start = ''
  let end = ''

  FavTripsModel.findOneAndUpdate({userId: req.session.myProperty._id}, {$push:{activities:name}})
  .then((result) => {
    start = result.start
    end = result.end

        CitiesModel.find({name: result.destination})
              .then((result)=>{
              const {name, lat, long} = result[0]
              res.redirect(`/mytrips/${name}/${lat}/${long}/${start}/${end}`)
            })
            .catch((error)=>{
              next(error)
            })
  })
  .catch((err) => {
    next(err)
  })

})

router.get("/mytrips/destination/map", isLogged, (req, res, next) => {
let loc = [51.5, -0.09] //mudar p variavel
let userInfo = req.session.myProperty;
/*
 send an array of locations = [
 [51.5, -0.09],
 [21.5, -0.09],
 [41.5, -0.09],
 [31.5, -0.09]
]
*/
let locations = [
  [51.5088234, -0.1266390],
  [51.5079149, -0.1254802],
  [51.5069912, -0.1272573],
  [51.5085476, -0.1254458]
 ]
 res.render('trips/activities.hbs' , {username: userInfo.name, locations: JSON.stringify(locations),loc: JSON.stringify(loc), layout:'logged-in-layout.hbs'});
// res.render('trips/activities.hbs' , {loc: JSON.stringify(loc), layout:'logged-in-layout.hbs'});
})


module.exports = router;
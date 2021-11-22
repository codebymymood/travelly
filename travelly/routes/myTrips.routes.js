const router = require("express").Router();
const axios = require('axios')

const OPENTRIP_KEY = process.env.API_KEY

router.get("/mytrips", (req, res, next) => {
    res.render('../views/trips/mytrips.hbs' , {layout:'logged-in-layout.hbs'});
  });
  
/* router.post("/mytrips", (req, res, next) => {
 const country = req.body.city

var config = {
  method: 'get',
  url: 'https://countriesnow.space/api/v0.1/countries/states',
  headers: { }
};

  axios(config)
      .then((response) => { 
          let joana = response.data.data
          res.render('../views/trips/mytrips.hbs' , {joana})
      })
      .catch((err) => {
          next(err)
      })

}); */







module.exports = router;
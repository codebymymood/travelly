const router = require("express").Router();
const TripsModel = require('../models/Trips.model')
const axios = require('axios')
const myApi = 'https://api.opentripmap.com/0.1'

router.get('/mytrips', (req, res, next) => {

    axios.get(`${myApi}/en/places/bbox?apikey=${process.env.TRIPMAP_KEY}`)
    .then((response) => {
        console.log(response)
    })
    .catch((err) => {
        console.log(err)
    })
})



module.exports = router;
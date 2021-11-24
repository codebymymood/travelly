require('../db') 
const mongoose = require('mongoose')

let CitiesModel = require('../models/Cities.model')

//3rd insert data in the model
CitiesModel.insertMany([
    {name: 'Porto', lat: 41.14961 , long: -8.61099},
    {name: 'Lisboa', lat:38.71667 , long: -9.13333},
    {name: 'Barcelona', lat:41.38879 , long:2.15899},
    {name: 'Marrakesh', lat: 31.63416 , long: -7.99994},
    {name: 'Amsterdam', lat: 52.37403 , long: 4.88969},
    {name: 'London', lat: 51.50853, long: -0.12574},
    {name: 'Prague', lat:50.08804 , long: 14.42076},
    {name: 'Rome', lat:41.89193, long: 12.51133},
    {name: 'Venice', lat: 45.43713 , long: 12.33265},
    {name: 'Istambul', lat:41.01384 , long:28.94966},
    {name: 'Split', lat:43.50891 , long: 16.43915},
    {name: 'Rio de Janeiro', lat: -22.90642, long: -43.18223},
    {name: 'Texas', lat: 30.26715, long:-97.74306},
    {name: 'Bogota', lat: 4.60971, long: -74.08175},
    {name: 'Tulum', lat:20.21173 , long: -87.46325},
    {name: 'Miami', lat: 25.77427, long:-80.19366},
    {name: 'Toronto', lat:43.70011 , long:-79.4163},
    {name: 'Tokyo', lat: 35.6895, long:139.69171},
    {name: 'Sidney', lat:-33.86785 , long:151.20732},
    {name: 'Pune', lat:18.74673 , long:73.75465},
    {name: 'Antonio', lat:18.74673 , long:73.75465}

])
    .then(() => {
        console.log('Data inserted')
        mongoose.connection.close()
    })
    .catch((err) => {
        console.log('Error', err)
        mongoose.connection.close()
    })


    //4th close terminal to run seed file with node!!!     node seeds/Todo.seed.js
require('../db') 
const mongoose = require('mongoose')

let ReminderModel = require('../models/Reminder.model')

ReminderModel.create({
    description: 'Check if passport is valid.'
})
.then(() => {
    console.log('Data inserted')
    mongoose.connection.close()
})
.catch((err) => {
    console.log('Error', err)
    mongoose.connection.close()
})


//4th close terminal to run seed file with node!!!     node seeds/Todo.seed.js
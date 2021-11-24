
const { Schema, model } = require("mongoose");
require('../models/favTrips.model')

const ReminderSchema = new Schema({
  
  description: String,

  favTripsId: {
    type: Schema.Types.ObjectId,
    ref: 'favTrips'
}

   
})


const ReminderModel = model("Reminder", ReminderSchema);

module.exports = ReminderModel

const { Schema, model } = require("mongoose");

const ReminderSchema = new Schema({
  
  description: String,

  favTripsId: {
    type: Schema.Types.ObjectId,
    ref: 'favTrips'
}

   
})


const ReminderModel = model("Reminder", ReminderSchema);

module.exports = ReminderModel
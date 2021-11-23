const mongoose = require("mongoose")

const ReminderSchema = new mongoose.Schema({
  
  description: String

   
})

const ReminderModel = mongoose.model("Reminder", ReminderSchema) 

module.exports = ReminderModel
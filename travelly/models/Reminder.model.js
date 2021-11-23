const mongoose = require("mongoose")

const ReminderSchema = new mongoose.Schema({
  
  description: String,

//   id: {
//     type: Schema.Types.ObjectId,
//     ref: 'User'
// }

   
})

const ReminderModel = mongoose.model("Reminder", ReminderSchema) 

module.exports = ReminderModel
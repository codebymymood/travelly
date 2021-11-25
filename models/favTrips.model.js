const { Schema, model } = require("mongoose");


const FavTripsSchema = new Schema({
    
      destination: {
        type: String,
        // required: true
      },     
    
    
      start: {
          type: Date,
          // required: true
      },    
    
    
      end: {
        type: Date,
        // required: true         
      },    
      
      
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

      reminder: [{
        type: Schema.Types.ObjectId,
        ref: 'Reminder'
      }],
    

      activities: {
         type: [String]
      }
  });
  
  const FavTrips = model("favTrips", FavTripsSchema);



module.exports = FavTrips;
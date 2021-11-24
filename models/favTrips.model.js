const { Schema, model } = require("mongoose");


const FavTripsSchema = new Schema({
    
      destination: {
        type: String,
        required: true
      },     
    
    
      start: {
          type: Date,
          required: true
      },    
    
    
      end: {
        type: Date,
        required: true         
      },    
      
      
      UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

      cityId: {
        type: Schema.Types.ObjectId,
        ref: 'cities'
    }
      
  });
  
  const FavTrips = model("favTrips", FavTripsSchema);



module.exports = FavTrips;
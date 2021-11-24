const { Schema, model } = require("mongoose");


const FavTripsSchema = new Schema({
    
      Destination: {
        type: String,
        required: true
      },     
    
    
      Start: {
          type: Date,
          required: true
      },    
    
    
      End: {
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
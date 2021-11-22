const { Schema, model } = require("mongoose");


const FavTripsSchema = new Schema({
    
      Destination: {
        type: String,
        required: true
      },     
    
    
      Start: {
          type: Date
      },    
    
    
      End: {
        type: Date         
      }        
      
  });
  
  const FavTrips = model("favTrips", FavTripsSchema);



module.exports = FavTrips;
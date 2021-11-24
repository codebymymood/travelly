const { Schema, model } = require("mongoose");


const CitiesSchema = new Schema({
    
        name: {
          type: String,
          required: true
          },     
    

    
        lat: {
            type: Number,
            required: true
        },   
    
    
        long: {
            type: Number,
            required: true       
          },
        
          activities: {
            type: [String]
          }  

});
  
  const Cities = model("cities", CitiesSchema);



module.exports = Cities;
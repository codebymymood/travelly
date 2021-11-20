const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema ({
 	    email: {
         type: String,
         required: true, 
         unique: true
       },
      password:{
        type: String, 
        minlength: 6
      },
 	    name: {
         type: String, 
         required: true,
         maxlength: 20
       }
})

const User = model("User", userSchema);

module.exports = User;

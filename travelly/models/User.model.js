const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const user = new Schema ({
      name: String, required: true, maxlength: 20,
 	    email: String, required: true, unique: true,
      password: String, minlength: 6
})

const User = model("User", userSchema);

module.exports = User;

const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const user = new Schema ({
 	    email: String, required: true, unique: true,
      password: String, minlength: 6, maxlength: 12,
 	    name: String, required: true, maxlength: 20
})

const User = model("User", userSchema);

module.exports = User;

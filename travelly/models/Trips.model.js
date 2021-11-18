const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the trips model to whatever makes sense in this case
const tripsSchema = new Schema(
  {
    trips: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    password: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const trips = model("trips", tripsSchema);

module.exports = trips;

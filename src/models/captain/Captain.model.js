import mongoose from "mongoose";

const captainSchema = mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 charecters"],
    },
    lastname: {
      type: String,
      required: true,
      minlength: [3, "Last name must be at least 3 charecters"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    // required: true,
    minlength: [3, "color must be 3 charecters"],
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be at least 3 charecters"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate must be at least 3 charecters"],
    },
    capacity: {
      type: Number,
      required: true,
      minlength: [1, "capacity must be at least 1 charecters"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    },
  },

  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

const Captain = mongoose.model("Captain", captainSchema);

export default Captain;

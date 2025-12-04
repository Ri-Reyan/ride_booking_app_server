import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
  socketId: {
    type: String,
  },
});

const User = mongoose.model("user", UserSchema);

export default User;

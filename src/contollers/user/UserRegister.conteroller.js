import User from "../../models/user/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserRegister = async (req, res) => {
  const {
    fullname: { firstname, lastname },
    email,
    password,
  } = req.body;

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({
      message: "Firstname , Lastname , Email , Password Required",
    });
  }

  if (!regexEmail.test(email)) {
    return res.status(400).json({
      message: "Invalid email format ",
    });
  }
  try {
    const finduser = await User.findOne({ email });

    if (finduser) {
      return res.status(400).json({
        message: "User already exits",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password: hashedPass,
    });

    const token = jwt.sign(
      { id: createdUser._id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    if (!createdUser) {
      return res.status(400).json({
        message: "User creation failed",
      });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // true in production
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User registered successfully",
      data: createdUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

export default UserRegister;

import jwt from "jsonwebtoken";
import Captain from "../../models/captain/Captain.model.js";
import bcrypt from "bcrypt";

const CaptainRegister = async (req, res) => {
  const {
    fullname: { firstname, lastname },
    email,
    password,
    vehicle: { color, plate, capacity, vehicleType },
  } = req.body;

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({
      message: "Firstname , Lastname , Email , Password Required",
    });
  }

  if (!regexEmail.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }

  try {
    const captainsExistense = await Captain.findOne({ email });

    if (captainsExistense) {
      return res.status(400).json({
        message: "User alraedy exits",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const createdCaptain = await Captain.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password: hashedPass,
      vehicle: { color, plate, capacity, vehicleType },
    });

    if (!createdCaptain) {
      return res.status(400).json({
        message: "User creation failed",
      });
    }

    const token = jwt.sign(
      { id: createdCaptain._id, role: "captain" },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Captain registerted successfully",
      data: createdCaptain,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export default CaptainRegister;

import jwt from "jsonwebtoken";
import Captain from "../../models/captain/Captain.model.js";
import bcrypt from "bcrypt";

const CaptainLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email & password required ",
    });
  }

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regexEmail.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }

  try {
    const findCaptain = await Captain.findOne({ email });

    if (!findCaptain) {
      return res.status(401).json({
        message: "Invalid  email or password ",
      });
    }

    const matchedPass = await bcrypt.compare(password, findCaptain.password);

    if (!matchedPass) {
      return res.status(400).json({
        message: "Invalid  email or password",
      });
    }

    const token = jwt.sign({ id: findCaptain._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    if (!token) {
      return res.status(500).json({
        message: "JWT generation error",
      });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Logged in successfull",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default CaptainLogin;

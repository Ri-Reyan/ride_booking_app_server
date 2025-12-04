import jwt from "jsonwebtoken";
import User from "../../models/user/User.model.js";
import bcrypt from "bcrypt";

const UserLogin = async (req, res) => {
  const { email, password } = req.body;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email & Password required",
    });
  }

  if (!regexEmail.test(email)) {
    return res.status(400).json({
      message: "Invalid email",
    });
  }
  try {
    const usersExistens = await User.findOne({ email });

    if (!usersExistens) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const matchPass = await bcrypt.compare(password, usersExistens.password);

    if (!matchPass) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: usersExistens._id, role: "user" },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successfull.",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

export default UserLogin;

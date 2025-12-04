import jwt from "jsonwebtoken";
import User from "../../models/user/User.model.js";

const UserTokenValid = async (req, res) => {
  const token = req.cookies.token;

  try {
    if (!token) {
      return res.status(400).json({
        message: "Unauthorized",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    const user = await User.findById(decode.id);

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export default UserTokenValid;

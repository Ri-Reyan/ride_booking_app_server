import User from "../models/user/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import BlackListModelUser from "../models/blackListModels/blacklistUser.model.js";

const userAuthMiddleware = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized.Invalid token",
    });
  }

  const isBlacklisted = await BlackListModelUser.findOne({ token: token });

  if (isBlacklisted) {
    return res.status(401).json({
      message: "Unautorized.Wrong token",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode._id);

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export default userAuthMiddleware;

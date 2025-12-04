import jwt from "jsonwebtoken";
import BlackListModelCaptain from "../models/blackListModels/blacklistCaptain.model";
import Captain from "../models/captain/Captain.model.js";

const captainAuthMiddleware = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const isBlacklisted = await BlackListModelCaptain.findOne({ token });

  if (!isBlacklisted) {
    return res.status(400).json({
      message: "Unauthorized",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await Captain.findById(decode._id);

    req.captain = captain;
    next();
  } catch (err) {
    message: err.message;
  }
};

export default captainAuthMiddleware;

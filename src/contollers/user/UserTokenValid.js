// controllers/UserTokenValid.controller.js
import jwt from "jsonwebtoken";
import User from "../../models/user/User.model.js";

const UserTokenValid = async (req, res) => {
  const token = req.cookies.token; // Token sent via cookie

  try {
    if (!token) {
      return res.status(400).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password"); // Exclude password

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user, // Only non-sensitive data
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export default UserTokenValid;

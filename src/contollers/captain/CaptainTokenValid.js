// controllers/CaptainTokenValid.controller.js
import jwt from "jsonwebtoken";
import Captain from "../../models/captain/Captain.model.js";

const CaptainTokenValid = async (req, res) => {
  const token = req.cookies.token; // JWT from cookie

  try {
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const captain = await Captain.findById(decoded.id).select("-password"); // Exclude password

    if (!captain) {
      return res
        .status(404)
        .json({ success: false, message: "Captain not found" });
    }

    return res.status(200).json({
      success: true,
      captain, // Only non-sensitive data
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export default CaptainTokenValid;

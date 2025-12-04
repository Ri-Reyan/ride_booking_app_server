import jwt from "jsonwebtoken";
import Captain from "../../models/captain/Captain.model.js";

const CaptainTokenValid = async (req, res) => {
  const token = req.cookies.token;

  try {
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(400).json({
        message: "Invalid token",
      });
    }

    const captain = await Captain.findById(decode.id);

    if (!captain) {
      return res.status(401).json({
        message: "Captain not found",
      });
    }

    return res.status(200).json({ token });
  } catch (err) {
    message: err.message;
  }
};

export default CaptainTokenValid;

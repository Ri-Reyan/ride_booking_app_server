import BlackListModelCaptain from "../../models/blackListModels/blacklistCaptain.model.js";
const CaptainLogout = async (req, res) => {
  const token = req.body?.cookies;

  if (!token) {
    return res.status(400).json({
      message: "Unauthorized",
    });
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // enable in production
    sameSite: "strict",
  });

  await BlackListModelCaptain.create({ token });

  return res.status(200).json({
    message: "Captain logged out successfully",
  });
};

export default CaptainLogout;

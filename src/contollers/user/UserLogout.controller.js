import BlackListModelUser from "../../models/blackListModels/blacklistUser.model.js";

const UserLogout = async (req, res) => {
  // Extract token with resilience
  const token = req.cookies?.token;

  // Early exit for missing token to avoid polluting the blacklist
  if (!token) {
    return res.status(400).json({
      message: "Token not found. Logout could not be processed.",
    });
  }

  // Clear session token cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: true, // enable in production
    sameSite: "none",
  });

  // Insert token into blacklist for downstream authorization invalidation
  await BlackListModelUser.create({ token });

  return res.status(200).json({
    message: "User logged out successfully",
  });
};

export default UserLogout;

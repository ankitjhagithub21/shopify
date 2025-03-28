import User from "../models/user.model.js";

export const isAdmin = async (req, res, next) => {
  if (!req.userId) {
    return res.status(401).json({ success: false, message: "Unauthorized." });
  }

  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user.isAdmin) {
      return res
        .status(401)
        .json({ success: false, message: "You are not an admin." });
    }

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized." });
  }
};

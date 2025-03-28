import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcryptjs";

const sendCookie = (payload, res) => {
  const token = jwt.sign(payload, process.env.JWT_SEC, { expiresIn: "1d" });
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(404)
      .json({ success: false, message: "All fields are required." });
  }

  if (!validator.isEmail(email)) {
    return res.status(404).json({ success: false, message: "Invalid email." });
  }

  if (!validator.isStrongPassword(password)) {
    return res
      .status(404)
      .json({ success: false, message: "Please enter strong password." });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User already exist." });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    sendCookie({ id: newUser._id }, res);

    res
      .status(201)
      .json({ success: true, message: "User registered successfully",data:{
        _id:newUser._id,
        isAdmin:newUser.isAdmin
      } });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(404)
      .json({ success: false, message: "All fields are required." });
  }

  if (!validator.isEmail(email)) {
    return res.status(404).json({ success: false, message: "Invalid email." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res
        .status(404)
        .json({ success: false, message: "Incorrect email or password." });
    }

    sendCookie({ id: user._id }, res);

    res
      .status(200)
      .json({ success: true, message: `Welcome back ${user.name}`,data:{
        _id:user._id,
        isAdmin:user.isAdmin
      } });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = (req, res) => {
 
return res.clearCookie("token", {
    maxAge: 0,
  }).status(200).json({success:false,message:"Logout successfull."});

};

export const getUser = async(req, res) => {
  try {

    const user = await User.findById(req.userId).select("-password");
    
    if(!user){
        return res.status(404).json({ success: false, message: "User not found" });
    }
   
      res.status(200).json({ success: true, data:user });
   
    

  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

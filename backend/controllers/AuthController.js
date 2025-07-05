import bcrypt from "bcryptjs";
import User from "../models/userModels.js";

import jwt from "jsonwebtoken";
import jwtToken from "../utils/jwtToken.js";

// Signup Controller for Registering USers

export const signup = async (req, res) => {
  try {
    // Destructure fields from the request body
    const { fullname, username, email, gender, password ,role} = req.body;
    // Check if All Details are there or not
    if (!fullname || !username || !email || !password || !gender || !role) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("the hashed pass is" + hashedPassword);

    const profileBoy = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const profileGirl = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const userDetails = {
      fullname,
      username,
      email,
      password: hashedPassword,
      gender,
      avatar: gender === "male" ? profileBoy : profileGirl,
      role
    };
    const user = await User.create(userDetails);

    const tokenData = {
      email: user.email,
      id: user._id,
      role: user.role,
    }
    jwtToken(tokenData , res)
    console.log("user is ", user);

    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};



// Login controller for authenticating users



export const login = async (req, res) => {
  try {
    // Destructure fields from the request body
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find user with provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User is not registered. Please sign up to continue",
      });
    }

    // Compare the provided password with the hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    // Create token payload
    const tokenData = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    // Generate and send token
    jwtToken(tokenData, res);
    user.password = undefined;

    // Send success response
    return res.status(200).json({
      success: true,
      user,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again later.",
    });
  }
};



export const logout=async(req,res)=>{
    
    try {
        res.cookie("jwt",'',{
            maxAge:0
        })
        res.status(200).send({success:true ,message:"User LogOut"})

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error);
    }
}

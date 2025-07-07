import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const { sign } = jwt;

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      return res.status(404).json({
        success: false,
        message: `User ${username} could not be found! Please try again with valid user info.`,
      });
    }

    const hashPassword = foundUser.password;

    const passwordsMatch = await bcrypt.compare(password, hashPassword);

    if (!passwordsMatch) {
      return res.status(401).json({
        success: false,
        message: "Passwords don't match. Please try again.",
      });
    }

    const accessToken = sign(
      {
        userId: foundUser._id,
        username: foundUser.username,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    res.status(200).json({
      success: true,
      message: "User successfully logged in.",
      accessToken,
    });
  } catch (error) {
    console.error("Something went wrong ->", error);
    res.status(500).json({
      success: false,
      message: "Could not complete the user login. Please try again.",
    });
  }
}

export { loginUser };

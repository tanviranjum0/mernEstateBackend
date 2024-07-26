const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { username, password, email } = await req.body;
  const existUser = await User.findOne({ email });

  if (existUser) return res.status(404).send("This email is already existed");
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    res.status(201).json("User created successfully!");
  } catch {
    res.status(400).json("User Creating Problem");
  }
};
const login = async (req, res) => {
  const { password, email } = await req.body;
  const validUser = await User.findOne({ email });

  if (!validUser) return res.json("No user found ..");
  const validPassword = await bcrypt.compare(password, validUser.password);

  if (!validPassword) return res.json("Wrong Credentials");
  try {
    userObject = {
      email,
      id: validUser._id,
    };

    const token = jwt.sign(userObject, process.env.JWT_SECRET);
    res
      .cookie("access_token", token, {
        maxAge: process.env.JWT_EXPIRY,
        httpOnly: true,
        signed: true,
      })
      .status(201)
      .json("Login successfully!");
  } catch {
    res.status(400).json("Login Problem");
  }
};

const signOut = (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json("User has been logged out!");
};
module.exports = { signup, login, signOut };

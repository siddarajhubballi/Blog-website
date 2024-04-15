import User from "../models/user.model.js";
import becryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    username == "" ||
    !email ||
    email == "" ||
    !password ||
    password == ""
  )
    {
      return next(errorHandler(400, "All feilds are required"));
    }

  const hashedPassword = becryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return res
      .status(201)
      .json({ message: "Signup successful", success: true });
  } catch (err) {
    return next(err);
  }
};

export const signin = async (req, res, next) => {
  const {email, password} = req.body;

  console.log(req.body)

  if(!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({email});
    console.log(validUser)
    if(!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = becryptjs.compareSync(password, validUser.password);
    
    if(!validPassword) {
      return next(errorHandler(400, "Invalid Password"));
    }

    const token = jwt.sign(
      {id: validUser?._id},
      process.env.JWT_SECRET,
    );

    const {password: pass, ...rest} = validUser._doc;

    res.status(200).cookie("access_token", token, {
      httpOnly: true
    }).json(rest);
  }
  catch (error) {
    return next(error);
  }
}
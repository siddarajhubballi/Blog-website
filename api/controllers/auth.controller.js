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

  if(!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({email});
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

export const google = async (req, res,  next) => {

  const {name, email, googlePhotoUrl} = req.body;

  try {
    const user = await User.findOne({email});

    if(user) {
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
      const {password, ...rest} = user._doc;

      res.status(200).cookie("access_token", token, {
        httpOnly: true,
      }).json(rest);
    }
    else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

      const hashedPassword = becryptjs.hashSync(generatedPassword, 10); 
      const newUser = new User({
        username: name?.toLowerCase()?.split(' ')?.join("") + Math.random().toString(9).slice(-4),
        email: email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,  
      })

      console.log(newUser);

      await newUser.save();

      const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
      const {password, ...rest} = newUser._doc;

      res.status(200).cookie("access_token", token, {
        httpOnly: true,
      }).json(rest);
    }
  }
  catch (error) {
    console.log(error);
    next(error);
  }
}
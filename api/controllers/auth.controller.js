import User from "../models/user.model.js";
import becryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

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
    next(errorHandler(400, "All feilds are required"));

  const hashedPassword = becryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  console.log(newUser);

  try {
    await newUser.save();
    return res
      .status(201)
      .json({ message: "Signup successful", success: true });
  } catch (err) {
    next(err);
  }
};

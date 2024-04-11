import User from "../models/user.model.js";
import becryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: "Bad Request", success: false });

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
    console.log(`Error while creating user :: ${err}`);
    return res
      .status(201)
      .json({ message: "Internal Server Error", success: false, data: err });
  }
};

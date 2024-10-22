import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../util/error.js";
export const signup = async (req, res, next) => {
  const { userName, name, email, phone, address, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = new User({
    userName: userName,
    name: name,
    email: email,
    phone: phone,
    address: address,
    password: hashedPassword,
  });
  try {
    await user.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { userName, password } = req.body;

  try {
    const validUser = await User.findOne({ userName });
    console.log("111111111111111111111", userName);

    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(404, "Wrong username or password"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const { response } = require("express");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken.js");
const createUser = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({ msg: "Email is required", success: false });
    }

    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      const newUser = await User.create(req.body);
      return res.status(201).json({ user: newUser, success: true });
    } else {
      return res.status(409).json({
        msg: "User already exists",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Server error", success: false, error: error.message });
  }
};

const loginUserCtrl = asyncHandler(async(req, res) => {
  const {email , password} = req.body;
  //check if user exists
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
      res.json(
        {
          _id : findUser?._id,
          firstname: findUser?.firstname,
          lastname: findUser?.lastname,
          email: findUser?.email,
          mobile: findUser?.mobile,
          token: generateToken(findUser?.id),
        }
      );
  } 
  else {
    throw new Error("Invalid Credentials");
  }
});

module.exports = {
  createUser,
  loginUserCtrl
};

const User = require("../models/User");

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { fullName, username, email, password } = req.body;
    const newUser = new User({
      fullName,
      username,
      email,
      password,
    });
    const existingUser = await User.findOne({ username });
    // console.log(existingUser);
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "This user is already exists" });
    }
    await newUser.save();
    console.log("New User added");
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed",
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "The user is not found",
      });
    }
    const passwordMatch = user.password === password;
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Password is not matched",
      });
    }

    return res.status(200).json({
      success: true,
      user,
      message: "Login successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
module.exports = {
  register,
  login,
};

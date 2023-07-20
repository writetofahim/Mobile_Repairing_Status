const User = require("../models/User");

// const addUser = async (req, res) => {
//   try {
//     console.log(req.body);
//     const { fullName, username, email, password } = req.body;
//     const newUser = new User({
//       fullName,
//       username,
//       email,
//       password,
//     });
//     const existingUser = await User.findOne({ username });
//     // console.log(existingUser);
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ success: false, message: "This user is already exists" });
//     }
//     await newUser.save();
//     console.log("New User added");
//     res.status(201).json({
//       success: true,
//       newUser,
//     });
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Failed",
//     });
//   }
// };

const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed",
    });
  }
};

module.exports = {
  getAllUser,
};

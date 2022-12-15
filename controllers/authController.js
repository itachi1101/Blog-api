const User = require("../models/user");

module.exports.signup = async (req, res) => {
  console.log(req.body)
  try {
    const pic = req.file.buffer;
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password,pic });
    const token = await user.generateAuthToken();
    res.status(201).json({
      user: user._doc,
      token,
      dataCreate: true,
    });
  } catch (error) {
    res.status(400).json({ error: error.message, SignUp: "failed" });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.Login(email, req.body.password);
    const token = await user.generateAuthToken();
    const {password,createdAt, updatedAt, isAdmin, __v, liked,pic,...others } =
    user._doc;
    res.status(200).send({
      others,
      token,
      login: "Success",
    });
  } catch (error) {
    res.status(400).json({ error: error.message, login: "Failed" });
  }
};


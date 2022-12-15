const User = require("../models/user");
const bcrypt = require("bcrypt");


module.exports.addLikedPosts = async (req, res) => {
  try {
    const id = req.user._id.toHexString();
    const { title } = req.body;
    const user = await User.findById(id);
    if (user) {
      const temp = user.liked.concat([title]);
      user.liked = [...new Set(temp)];
      await user.save();
      res.status(201).json({
        data: user._doc,
        status: "Liked array updated",
      });
    } else {
      res.status(404).json({ status: "user not found" });
    }
  } catch (err) {
    res.status(401).json({
      error: err.message,
    });
  }
};
module.exports.getLikedPosts = async (req, res) => {
  try {
    const id = req.user._id.toHexString();
    const user = await User.findById(id);
    if (user) {
      res.status(200).json({ data: user.liked });
    } else {
      res.status(404).json({ error: "user not found" });
    }
  } catch (error) {
    res.send(404).json({ error: error.message });
  }
};
module.exports.deleteLikedPosts = async (req, res) => {
  try {
    const id = req.user._id.toHexString();
    const { title } = req.body;
    const user = await User.findById(id);
    if (user) {
      const newLikedArray = user.liked.filter((value, index, arr) => {
        return value != title;
      });
      user.liked = newLikedArray;
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "No such user found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports.updateProfile = async (req, res) => {
  try {
    const id = req.user._id.toHexString();
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 8);
      const updatedUser = await User.findByIdAndUpdate(id, {
        $set: req.body,
      });
      if (updatedUser) {
        res.status(200).json({ data: updatedUser });
      } else {
        res.status(400).json({ error: error });
      }
    } else {
      const updatedUser = await User.findByIdAndUpdate(id, {
        username: req.body.username,
      });
      if (updatedUser) {
        res.status(200).json({ data: updatedUser });
      } else {
        res.status(400).json({ error: error });
      }
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const id = req.user._id.toHexString();
    const username = req.user.username;
    const email = req.user.email;
    res.status(200).json({ id, username, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

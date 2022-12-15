const { Router } = require("express");
const env=require('dotenv')
const cloudinary = require('cloudinary').v2
const userController = require("../controllers/userController");
const authenticate = require("../middlewares/authMiddleware");
env.config()
const router = Router();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});




router.put(
  "/api/user/updatelikedposts/",
  authenticate.auth,
  userController.addLikedPosts
);
router.post(
  "/api/user/deleteunlikedposts/",
  authenticate.auth,
  userController.deleteLikedPosts
);
router.get(
  "/api/user/getlikedposts/",
  authenticate.auth,
  userController.getLikedPosts
);
router.post(
  "/api/user/updateUser",
  authenticate.auth,
  userController.updateProfile
);
router.get("/api/user/getUser", authenticate.auth, userController.getUser);
module.exports = router;

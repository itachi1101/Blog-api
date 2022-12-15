const { Router } = require("express");
const userController = require("../controllers/userController");
const router = Router();
const authenticate = require("../middlewares/authMiddleware");
const multer = require("multer");
const upload = multer({
  limits: {
    fileSize: 2000000,
    fileFilter(req, file, cb) {
      cb(undefined, true);
    },
  },
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
router.get("/api/user/:id/avatar", userController.getProfileImage);
router.post(
  "/api/user/updateUser",
  upload.single("file"),
  authenticate.auth,
  userController.updateProfile
);
router.get("/api/user/getUser", authenticate.auth, userController.getUser);
module.exports = router;

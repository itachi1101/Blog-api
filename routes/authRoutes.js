const { Router } = require("express");
const authController = require("../controllers/authController");
const router = Router();
const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
  },
});
router.post(
  "/api/signup/",
  upload.single("pic"),
  authController.signup,
  (error, req, res, next) => {
    res.status(400).json({ error: error.message });
  }
);
router.post("/api/login/", authController.login);

module.exports = router;

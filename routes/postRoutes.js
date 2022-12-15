const { Router } = require("express");
const multer = require("multer");
const authenticate = require("../middlewares/authMiddleware");
const postController = require("../controllers/postController");
const router = Router();
const upload = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    // if (req.file && !file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    //   return cb(new Error("Please upload an image"));
    // }
    cb(undefined, true);
  },
});
router.post(
  "/api/post/create/",
  authenticate.auth,
  upload.single("pic"),
  postController.create,
  (error, req, res, next) => {
    res.status(400).json({ error: error.message });
  }
);
router.get("/api/post/allposts", postController.getAllPosts);
router.get(
  "/api/post/myposts/",
  authenticate.auth,
  postController.searchUserPosts
);
router.get("/api/post/:id", postController.getPostById);
router.delete(
  "/api/post/:id",
  authenticate.auth,
  postController.deletePostById
);
router.put("/api/post/:id", authenticate.auth, postController.updatePostById);
router.get("/api/post/:id/image", postController.getPostImage);
module.exports = router;

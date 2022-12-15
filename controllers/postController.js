const Post = require("../models/post");
module.exports.create = async (req, res) => {
  try {
    if (req.file) {
      const pic = req.file.buffer;
      const { title, description, isPrivate, type,author } = req.body;
      const post = await Post.create({
        title,
        description,
        author,
        isPrivate,
        pic,
        type
      });
      res.status(201).send({
        title,
        description,
        author,
        isPrivate,
        pic,
        type,
        PostCreated: "successful",
      });
    } else {
      const { title, description, isPrivate,author} = req.body;
      const post = await Post.create({
        title,
        description,
        author,
        isPrivate,
      });

      res.status(201).json({
        title,
        description,
        author,
        isPrivate,
        type,
        PostCreated: "successful",
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err.message,
      PostCreation: "failed",
    });
  }
};

module.exports.searchUserPosts = async (req, res) => {
  try {
    const author = req.email;
    const posts = await Post.find({ author});
    if (posts) {
      res.status(200).json({
        data: posts,
        status: "posts found",
      });
    } else {
      res.status(200).json({
        status: "posts not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: "no post found",
    });
  }
};

module.exports.getAllPosts = async (req, res) => {
  try {
    const PAGE_SIZE = 6;
    const page = parseInt(req.query.page || "0");
    const total = await Post.countDocuments({ isPrivate: false });
    const posts = await Post.find({ isPrivate: false })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    if (!posts) res.status(404).json({ posts: "no posts found" });
    else {
      res.status(200).json({ totalPages: Math.ceil(total / PAGE_SIZE), posts });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports.getPostById = async (req, res) => {
  const _id = req.params.id;
  try {
    const allPosts = await Post.findById(_id);
    if (!allPosts) res.status(404).json({ posts: "no posts found" });
    else {
      res.status(200).json({ data: allPosts });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
module.exports.deletePostById = async (req, res) => {
  const _id = req.params.id;
  try {
    const post = await Post.findByIdAndDelete(_id);
    if (!post) return res.status(400).send();
    res.send(post);
  } catch (err) {
    res.status(500).json({ err: error });
  }
};
module.exports.updatePostById = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getPostImage = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.set("Content-Type", "image/jpg");
    res.send(post.pic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

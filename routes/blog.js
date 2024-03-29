const { Router } = require("express");
const multer = require("multer");
const Blog = require("../models/blog");
const path = require("path");
const Comment = require("../models/comment");

const blogRoute = Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function(req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

blogRoute.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user
  });
});

blogRoute.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");
  console.log(comments)
  return res.render("blog", {
    user: req.user,
    blog,
    comments
  });
});

blogRoute.post("/comment/:blogId", async (req, res) => {
  const comment = await Comment.create({
    content: req.body.content,
    createdBy: req.user._id,
    blogId: req.params.blogId
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

blogRoute.post("/", upload.single("coverImage"), async (req, res) => {
  const { body, title } = req.body;
  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`
  });

  return res.redirect(`/blog/${blog._id}`);
});

module.exports = blogRoute;

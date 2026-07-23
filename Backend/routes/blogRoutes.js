const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// Create Blog (Multiple Images)
router.post(
  "/create",
  upload.array("images", 10),
  createBlog
);

// Get All Blogs
router.get("/all", getBlogs);

// Get Single Blog
router.get("/:id", getBlog);

// Update Blog
router.put(
  "/update/:id",
  upload.array("images", 10),
  updateBlog
);

// Delete Blog
router.delete("/delete/:id", deleteBlog);

module.exports = router;
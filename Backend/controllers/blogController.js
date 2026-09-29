const Blog = require("../models/Blog");

const sharp = require("sharp");

const path = require("path");

const fs = require("fs");

const { v4: uuid } = require("uuid");

// Create Blog
exports.createBlog = async (req, res) => {
  try {
    let images = [];

    if (req.files && req.files.length > 0) {
      const uploadPath = path.join(__dirname, "../uploads/blogs");

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      for (const file of req.files) {
        const filename = uuid() + ".webp";

        await sharp(file.buffer)
          .resize({
            width: 1200,
            withoutEnlargement: true,
          })
          .webp({ quality: 80 })
          .toFile(path.join(uploadPath, filename));

        images.push(filename);
      }
    }

    const blog = await Blog.create({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      images,
    });

    res.status(201).json({
      success: true,
      message: "Blog Created",
      blog,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      blogs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get Single Blog
exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog Not Found",
      });
    }

    res.json({
      success: true,
      blog,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update Blog
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog Not Found",
      });
    }

    if (req.files && req.files.length > 0) {
      const uploadPath = path.join(__dirname, "../uploads/blogs");

      // Delete Old Images
      blog.images.forEach((img) => {
        const oldPath = path.join(uploadPath, img);

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      });

      let newImages = [];

      for (const file of req.files) {
        const filename = uuid() + ".webp";

        await sharp(file.buffer)
          .resize({ width: 1200 })
          .webp({ quality: 80 })
          .toFile(path.join(uploadPath, filename));

        newImages.push(filename);
      }

      blog.images = newImages;
    }

    blog.title = req.body.title;
    blog.description = req.body.description;
    blog.date = req.body.date;

    await blog.save();

    res.json({
      success: true,
      message: "Updated Successfully",
      blog,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog Not Found",
      });
    }

    const uploadPath = path.join(__dirname, "../uploads/blogs");

    blog.images.forEach((img) => {
      const file = path.join(uploadPath, img);

      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    });

    await blog.deleteOne();

    res.json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
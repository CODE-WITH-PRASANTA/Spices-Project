const fs = require("fs");
const path = require("path");
const Gallery = require("../models/Gallery");

// =========================================================
// GET PHYSICAL FILE PATH
// =========================================================

const getFilePath = (imageUrl) => {
  if (!imageUrl) {
    return null;
  }

  // Remove leading slash(es)
  const cleanPath = imageUrl.replace(/^\/+/, "");

  return path.join(
    __dirname,
    "..",
    cleanPath
  );
};

// =========================================================
// DELETE PHYSICAL IMAGE
// =========================================================

const deleteImageFile = (imageUrl) => {
  try {
    const filePath = getFilePath(imageUrl);

    if (
      filePath &&
      fs.existsSync(filePath)
    ) {
      fs.unlinkSync(filePath);
    }
  } catch {
    // Do not print errors in terminal.
    // Database operation should not fail because
    // physical file deletion failed.
  }
};

// =========================================================
// GET ALL GALLERY
// =========================================================

const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find()
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: gallery.length,
      data: gallery,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch gallery.",
      error: error.message,
    });
  }
};

// =========================================================
// CREATE GALLERY
// =========================================================

const createGallery = async (req, res) => {
  let uploadedImage = null;

  try {
    const { title } = req.body;

    // -----------------------------
    // TITLE VALIDATION
    // -----------------------------

    if (
      !title ||
      !title.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Title is required.",
      });
    }

    // -----------------------------
    // IMAGE VALIDATION
    // -----------------------------

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    uploadedImage = req.file.url;

    if (!uploadedImage) {
      return res.status(400).json({
        success: false,
        message: "Uploaded image path is missing.",
      });
    }

    // -----------------------------
    // SAVE DATABASE
    // -----------------------------

    const gallery = await Gallery.create({
      title: title.trim(),
      image: uploadedImage,
    });

    return res.status(201).json({
      success: true,
      message: "Gallery added successfully.",
      data: gallery,
    });
  } catch (error) {
    // Remove newly uploaded file
    // if database operation fails.

    if (uploadedImage) {
      deleteImageFile(uploadedImage);
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create gallery.",
      error: error.message,
    });
  }
};

// =========================================================
// UPDATE GALLERY
// =========================================================

const updateGallery = async (req, res) => {
  let newImage = null;

  try {
    const { id } = req.params;

    const gallery =
      await Gallery.findById(id);

    // -----------------------------
    // RECORD NOT FOUND
    // -----------------------------

    if (!gallery) {
      if (req.file?.url) {
        deleteImageFile(req.file.url);
      }

      return res.status(404).json({
        success: false,
        message: "Gallery image not found.",
      });
    }

    const oldImage = gallery.image;

    // -----------------------------
    // TITLE UPDATE
    // -----------------------------

    if (
      req.body.title !== undefined
    ) {
      const newTitle =
        req.body.title.trim();

      if (!newTitle) {
        if (req.file?.url) {
          deleteImageFile(req.file.url);
        }

        return res.status(400).json({
          success: false,
          message: "Title cannot be empty.",
        });
      }

      gallery.title = newTitle;
    }

    // -----------------------------
    // IMAGE UPDATE
    // -----------------------------

    if (req.file?.url) {
      newImage = req.file.url;

      gallery.image = newImage;
    }

    // -----------------------------
    // SAVE DATABASE
    // -----------------------------

    await gallery.save();

    // -----------------------------
    // DELETE OLD IMAGE
    // AFTER DATABASE SUCCESS
    // -----------------------------

    if (
      newImage &&
      oldImage &&
      oldImage !== newImage
    ) {
      deleteImageFile(oldImage);
    }

    return res.status(200).json({
      success: true,
      message: "Gallery updated successfully.",
      data: gallery,
    });
  } catch (error) {
    // Delete newly uploaded image
    // when update fails.

    if (newImage) {
      deleteImageFile(newImage);
    } else if (req.file?.url) {
      deleteImageFile(req.file.url);
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update gallery.",
      error: error.message,
    });
  }
};

// =========================================================
// DELETE SINGLE GALLERY
// =========================================================

const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery =
      await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found.",
      });
    }

    const image = gallery.image;

    // Delete MongoDB record
    await Gallery.findByIdAndDelete(id);

    // Delete physical image
    if (image) {
      deleteImageFile(image);
    }

    return res.status(200).json({
      success: true,
      message: "Gallery deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete gallery.",
      error: error.message,
    });
  }
};

// =========================================================
// BULK DELETE
// =========================================================

const bulkDeleteGallery = async (
  req,
  res
) => {
  try {
    const { ids } = req.body;

    if (
      !Array.isArray(ids) ||
      ids.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide gallery IDs.",
      });
    }

    const galleries =
      await Gallery.find({
        _id: {
          $in: ids,
        },
      });

    await Gallery.deleteMany({
      _id: {
        $in: ids,
      },
    });

    // Delete physical images
    galleries.forEach((gallery) => {
      if (gallery.image) {
        deleteImageFile(
          gallery.image
        );
      }
    });

    return res.status(200).json({
      success: true,
      message: `${galleries.length} gallery images deleted successfully.`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Failed to delete gallery images.",
      error: error.message,
    });
  }
};

// =========================================================
// EXPORT
// =========================================================

module.exports = {
  getGallery,
  createGallery,
  updateGallery,
  deleteGallery,
  bulkDeleteGallery,
};
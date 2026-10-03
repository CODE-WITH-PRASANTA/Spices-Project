const express = require("express");

const router = express.Router();

const upload =
  require("../middleware/multer");

const {
  getGallery,
  createGallery,
  updateGallery,
  deleteGallery,
  bulkDeleteGallery,
} = require("../controllers/galleryController");

// =========================================================
// GET ALL
// =========================================================

router.get(
  "/",
  getGallery
);

// =========================================================
// CREATE
// =========================================================

router.post(
  "/",
  ...upload.single(
    "image",
    "gallery"
  ),
  createGallery
);

// =========================================================
// UPDATE
// =========================================================

router.put(
  "/:id",
  ...upload.single(
    "image",
    "gallery"
  ),
  updateGallery
);

// =========================================================
// BULK DELETE
// IMPORTANT: MUST COME BEFORE /:id
// =========================================================

router.delete(
  "/bulk",
  bulkDeleteGallery
);

// =========================================================
// SINGLE DELETE
// =========================================================

router.delete(
  "/:id",
  deleteGallery
);

module.exports = router;
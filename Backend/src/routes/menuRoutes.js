const express = require("express");

const router =
  express.Router();

const upload =
  require("../middleware/multer");

const {
  getMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
} = require("../controllers/menuController");

// GET ALL
router.get(
  "/",
  getMenus
);

// GET ONE
router.get(
  "/:id",
  getMenuById
);

// CREATE
router.post(
  "/",
  upload.single("image"),
  createMenu
);

// UPDATE
router.put(
  "/:id",
  upload.single("image"),
  updateMenu
);

// DELETE
router.delete(
  "/:id",
  deleteMenu
);

module.exports = router;
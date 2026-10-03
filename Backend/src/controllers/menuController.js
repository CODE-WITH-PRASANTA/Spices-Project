const Menu = require("../models/Menu");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// =====================================================
// MENU UPLOAD DIRECTORY
// =====================================================

const menuUploadDirectory = path.join(
  process.cwd(),
  "uploads",
  "menu"
);

if (!fs.existsSync(menuUploadDirectory)) {
  fs.mkdirSync(menuUploadDirectory, {
    recursive: true,
  });
}

// =====================================================
// DELETE MENU IMAGE
// =====================================================

const deleteMenuImage = async (imageName) => {
  try {
    if (!imageName) return;

    const imagePath = path.join(
      menuUploadDirectory,
      imageName
    );

    if (fs.existsSync(imagePath)) {
      await fs.promises.unlink(imagePath);
    }
  } catch (error) {
    console.error(
      "DELETE MENU IMAGE ERROR:",
      error.message
    );
  }
};

// =====================================================
// CONVERT IMAGE TO WEBP
// =====================================================

const convertImageToWebp = async (file) => {
  if (!file) {
    throw new Error("Image file is missing");
  }

  const randomString = crypto
    .randomBytes(6)
    .toString("hex");

  const fileName =
    `menu-${Date.now()}-${randomString}.webp`;

  const outputPath = path.join(
    menuUploadDirectory,
    fileName
  );

  // Memory storage
  if (file.buffer) {
    await sharp(file.buffer)
      .resize({
        width: 1200,
        withoutEnlargement: true,
      })
      .webp({
        quality: 85,
      })
      .toFile(outputPath);
  }

  // Disk storage
  else if (file.path) {
    await sharp(file.path)
      .resize({
        width: 1200,
        withoutEnlargement: true,
      })
      .webp({
        quality: 85,
      })
      .toFile(outputPath);

    if (fs.existsSync(file.path)) {
      await fs.promises.unlink(file.path);
    }
  }

  else {
    throw new Error(
      "Uploaded image does not contain file path or buffer"
    );
  }

  return fileName;
};

// =====================================================
// GET ALL MENUS
// =====================================================

const getMenus = async (req, res) => {
  try {
    const {
      search = "",
      category = "",
      page = 1,
      limit = 100,
    } = req.query;

    const currentPage = Math.max(
      Number(page) || 1,
      1
    );

    const itemsLimit = Math.max(
      Number(limit) || 100,
      1
    );

    const skip =
      (currentPage - 1) * itemsLimit;

    const query = {};

    // SEARCH
    if (search.trim()) {
      query.$or = [
        {
          name: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          description: {
            $regex: search.trim(),
            $options: "i",
          },
        },
      ];
    }

    // CATEGORY
    if (
      category &&
      category.trim() &&
      category !== "All"
    ) {
      query.category = category.trim();
    }

    const total =
      await Menu.countDocuments(query);

    const menus = await Menu.find(query)
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(itemsLimit)
      .lean();

    const totalPages = Math.max(
      Math.ceil(total / itemsLimit),
      1
    );

    return res.status(200).json({
      success: true,
      message: "Menu items fetched successfully",

      data: menus,

      pagination: {
        page: currentPage,
        limit: itemsLimit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error(
      "GET MENUS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch menu items",
      error: error.message,
    });
  }
};

// =====================================================
// GET SINGLE MENU
// =====================================================

const getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(
      req.params.id
    );

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: menu,
    });
  } catch (error) {
    console.error(
      "GET MENU ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch menu item",
      error: error.message,
    });
  }
};

// =====================================================
// CREATE MENU
// =====================================================

const createMenu = async (req, res) => {
  let convertedImage = "";

  try {
    const {
      name,
      description,
      price,
      category,
    } = req.body;

    // IMAGE
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Food image is required",
      });
    }

    // NAME
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Menu name is required",
      });
    }

    // DESCRIPTION
    if (
      !description ||
      !description.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Menu description is required",
      });
    }

    // CATEGORY
    if (!category || !category.trim()) {
      return res.status(400).json({
        success: false,
        message: "Menu category is required",
      });
    }

    // PRICE
    const cleanPrice = String(
      price ?? ""
    )
      .replace(/[₹,\s]/g, "")
      .trim();

    const numericPrice =
      Number(cleanPrice);

    if (
      !cleanPrice ||
      !Number.isFinite(numericPrice) ||
      numericPrice < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid menu price is required",
      });
    }

    // IMAGE CONVERSION
    convertedImage =
      await convertImageToWebp(
        req.file
      );

    // CREATE
    const menu = await Menu.create({
      name: name.trim(),

      description:
        description.trim(),

      price: numericPrice,

      category:
        category.trim(),

      image:
        convertedImage,
    });

    return res.status(201).json({
      success: true,

      message:
        "Menu item added successfully",

      data: menu,
    });
  } catch (error) {
    console.error(
      "CREATE MENU ERROR:",
      error
    );

    if (convertedImage) {
      await deleteMenuImage(
        convertedImage
      );
    }

    return res.status(500).json({
      success: false,

      message:
        error.message ||
        "Failed to create menu item",
    });
  }
};

// =====================================================
// UPDATE MENU
// =====================================================

const updateMenu = async (req, res) => {
  let newImageName = "";

  try {
    const menu =
      await Menu.findById(
        req.params.id
      );

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    const {
      name,
      description,
      price,
      category,
    } = req.body;

    // NAME
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Menu name is required",
      });
    }

    // DESCRIPTION
    if (
      !description ||
      !description.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Menu description is required",
      });
    }

    // CATEGORY
    if (!category || !category.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Menu category is required",
      });
    }

    // PRICE
    const cleanPrice = String(
      price ?? ""
    )
      .replace(/[₹,\s]/g, "")
      .trim();

    const numericPrice =
      Number(cleanPrice);

    if (
      !cleanPrice ||
      !Number.isFinite(numericPrice) ||
      numericPrice < 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Valid menu price is required",
      });
    }

    // UPDATE DATA
    menu.name =
      name.trim();

    menu.description =
      description.trim();

    menu.price =
      numericPrice;

    menu.category =
      category.trim();

    // NEW IMAGE
    if (req.file) {
      const oldImage =
        menu.image;

      newImageName =
        await convertImageToWebp(
          req.file
        );

      menu.image =
        newImageName;

      await menu.save();

      if (oldImage) {
        await deleteMenuImage(
          oldImage
        );
      }
    }

    // NO NEW IMAGE
    else {
      await menu.save();
    }

    return res.status(200).json({
      success: true,

      message:
        "Menu item updated successfully",

      data: menu,
    });
  } catch (error) {
    console.error(
      "UPDATE MENU ERROR:",
      error
    );

    if (newImageName) {
      await deleteMenuImage(
        newImageName
      );
    }

    return res.status(500).json({
      success: false,

      message:
        error.message ||
        "Failed to update menu item",
    });
  }
};

// =====================================================
// DELETE MENU
// =====================================================

const deleteMenu = async (req, res) => {
  try {
    const menu =
      await Menu.findById(
        req.params.id
      );

    if (!menu) {
      return res.status(404).json({
        success: false,
        message:
          "Menu item not found",
      });
    }

    const oldImage =
      menu.image;

    await Menu.findByIdAndDelete(
      req.params.id
    );

    if (oldImage) {
      await deleteMenuImage(
        oldImage
      );
    }

    return res.status(200).json({
      success: true,
      message:
        "Menu item deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE MENU ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete menu item",
      error: error.message,
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
};
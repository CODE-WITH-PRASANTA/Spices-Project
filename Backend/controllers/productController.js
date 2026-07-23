const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const Product = require('../models/Product'); // Adjust the path if necessary

exports.createProduct = async (req, res) => {
  try {
    const productData = { ...req.body };

    if (req.file) {
      // 1. Define filename with .webp extension
      const filename = `product-${Date.now()}.webp`;
      const outputPath = path.join('uploads', filename); // Ensure this folder exists

      // 2. Process image with Sharp
      await sharp(req.file.buffer)
        .webp({ quality: 80 }) // Convert to WebP
        .toFile(outputPath);   // Save to disk

      productData.image = filename;
    }

    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};
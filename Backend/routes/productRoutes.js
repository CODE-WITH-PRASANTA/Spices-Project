const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // Path to your multer file
const { createProduct, getProducts, deleteProduct } = require('../controllers//productController');

// 'image' matches the name attribute in your frontend if using FormData
router.post('/', upload.single('image'), createProduct); 
router.get('/', getProducts);
router.delete('/:id', deleteProduct);

module.exports = router;
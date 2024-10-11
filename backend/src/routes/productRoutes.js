const express = require('express');

const ProductController = require('../controllers/productController.js');

const router = express.Router();

router.delete('/products/:id', ProductController.deleteProductController);
router.patch('/products/:id', ProductController.patchProductController);
router.post('/products', ProductController.postProductController);
router.get('/products/q', ProductController.getProductControllerByName);
router.get('/products/:id', ProductController.getProductControllerById);
router.get('/products', ProductController.getProductController);




module.exports = router
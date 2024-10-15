const express = require('express');

const OrderController = require('../controllers/orderController.js');

const router = express.Router();

router.delete('/orders/:id', OrderController.deleteOrderController);
router.patch('/orders/:id', OrderController.patchOrderController);
router.post('/orders', OrderController.postOrderController);
router.get('/orders/:id', OrderController.getOrderControllerById);
router.get('/orders', OrderController.getOrderController);




module.exports = router
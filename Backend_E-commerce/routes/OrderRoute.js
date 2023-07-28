const express = require('express')
const router = express.Router();
const orderController = require('../controllers/OrderController')

router.route('/order')
.post(orderController.saveOrder)

router.route('/getSelectOrder')
.post(orderController.getSelectOrder)

router.route('/getOrder')
.get(orderController.getOrder)

router.route('/deleteOrder/:id')
.delete(orderController.deleteOrder)

module.exports =router;
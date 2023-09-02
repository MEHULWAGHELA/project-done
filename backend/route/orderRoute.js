const orderController = require('../Controllers/orderController')
const express = require("express");
const router = express.Router();

router.get('/get' , (req,res) => orderController.order.get(req,res))
router.post('/add' , (req,res) => orderController.order.add(req,res))
router.delete('/remove' , (req,res) => orderController.order.remove(req,res))

module.exports = router;
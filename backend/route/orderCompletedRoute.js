const orderCompletedController = require('../Controllers/orderCompletedController')
const express = require("express");
const router = express.Router();

router.get('/get' , (req,res) => orderCompletedController.order.get(req,res))

module.exports = router;
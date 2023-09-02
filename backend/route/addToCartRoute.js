const addToCartController = require('../Controllers/addToCartController')
const express = require("express");
const router = express.Router();

router.get('/get' , (req,res) => addToCartController.addtocart.get(req,res))
router.post('/add' , (req,res) => addToCartController.addtocart.add(req,res))
router.delete('/remove' , (req,res) => addToCartController.addtocart.remove(req,res))

module.exports = router;
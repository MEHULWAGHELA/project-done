const express = require("express");
const router = express.Router();

const productRoutes = require('./productRoute');
const userRoutes = require('./userRoute');
const addToCartRoute = require('./addToCartRoute');
const orderRoute = require('./orderRoute');
const orderCompletedRoute = require('./orderCompletedRoute');
router.use('/product' , productRoutes);
router.use('/user' , userRoutes);
router.use('/addtocart' , addToCartRoute);
router.use('/order' , orderRoute);
router.use('/orderCompleted' , orderCompletedRoute);

module.exports = router;
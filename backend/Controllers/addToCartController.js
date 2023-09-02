const PRODUCT = require("../model/product");
const ADD_TO_CART = require("../model/addToCart");
const jwt = require("jsonwebtoken");

exports.addtocart = {
  get: async (req, res) => {
    try {
      var token = req.headers.authorization?.split(" ")[1];
      jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
        if (err) {
          return res.json({
            message: "Auth token not found",
            error: err,
            isSuccess: false,
          });
        } else {
          const carts = await ADD_TO_CART.findOne({ userId: decoded.user_Id });
          let data = carts ? await PRODUCT.find({ '_id': { $in: carts.cartProducts } }) : []
          return res.json({
            message: "Your data get successfull",
            isSuccess: true,
            data: data
          });
        }
      });
    } catch (err) {
      return res.json({error: 'Something wrong!!'});
    }
  },
  add: async (req, res) => {
    try {
        let {productId} = req.body;
        if(!productId){
            return res.json({  isSuccess : false, error : "product Id is required." });
        }
      var token = req.headers.authorization?.split(" ")[1];
      jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
        if (err) {
          return res.json({
            message: "Auth token not found",
            error: err,
            isSuccess: false,
          });
        } else {
          const user = await ADD_TO_CART.findOne({ userId: decoded.user_Id });
          let exist = await ADD_TO_CART.findOne({cartProducts: {"$in": [productId]}}) 
          if(exist){
            return res.json({
              message: "This product is already in cart.",
              isSuccess: true
          });
          }
          if(user){
            await ADD_TO_CART.updateOne({ _id: user._id }, { $push: { cartProducts: productId } })
              return res.json({
                message: "Product is added.",
                isSuccess: true
              });
          }else{
            await ADD_TO_CART.create({userId : decoded.user_Id , cartProducts : [productId]})
              return res.json({
                  message: "Product is added.",
                  isSuccess: true
              });
          }
        
        }
      });
    } catch (err) {
      return res.json({error: 'Something wrong!!'});
    }
  },
  remove: async (req, res) => {
    try {
        let {productId} = req.query;
        if(!productId){
            return res.json({  isSuccess : false, error : "product Id is required." });
        }
      var token = req.headers.authorization?.split(" ")[1];
      jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
        if (err) {
          return res.json({
            message: "Auth token not found",
            error: err,
            isSuccess: false,
          });
        } else {
          const user = await ADD_TO_CART.findOne({ userId: decoded.user_Id });

          if(user){
            await ADD_TO_CART.updateOne({ _id: user._id }, { $pull: { cartProducts: productId } })
              return res.json({
                message: "Product is removed.",
                isSuccess: true
              });
          }else{
              return res.json({
                  message: "Your product is not in cart",
                  isSuccess: true
              });
          }
        
        }
      });
    } catch (err) {
      return res.json({error: 'Something wrong!!'});
    }
  }

};

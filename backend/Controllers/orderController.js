const PRODUCT = require("../model/product");
const ADD_TO_CART = require("../model/addToCart");
const ORDER_COMPLETED = require("../model/orderCompleted");
const ORDER = require("../model/order");
const jwt = require("jsonwebtoken");

function addHours(date, hours) {
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);

  return date;
}

// function addHours(date, hours) {
//   date.setTime(date.getTime() +10000);

//   return date;
// }

exports.order = {
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
          const records = await ORDER.findOne({ userId: decoded.user_Id}); 
          if(records){
            let completedRecords = records.orderProducts.filter(x => x.orderComplateTime < new Date())
          
              const user = await ORDER_COMPLETED.findOne({ userId: decoded.user_Id });
              await ORDER.update( 
                { userId: decoded.user_Id },
                {
                    $pull: {
                      orderProducts: { _id : completedRecords.map(x => x._id) }
                    }
                },
                { safe: true }
            );
          }
          const orders = await ORDER.findOne({ userId: decoded.user_Id });
          return res.json({
            message: "Your data get successfull",
            isSuccess: true,
            data : orders?.orderProducts ?? []
          });
        }
      });
    } catch (err) {
      return res.json({error: 'Something wrong!!'});
    }
  },
  add: async (req, res) => {
    try {
        let {productId , quantity} = req.body;
        if(!productId && quantity){
            return res.json({  isSuccess : false, error : "All input is required." });
        }
        if(quantity < 0){
          return res.json({  isSuccess : false, error : "Quanity must be more than 1" });
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
          const user = await ORDER.findOne({ userId: decoded.user_Id });
          let product = await PRODUCT.findOne({ _id: productId });
          if(product){
            product['quantity'] = quantity;
            product['totalPrice'] = Number(product['price']) * Number(quantity);
            product['orderComplateTime'] = addHours(new Date(), 1);
          }else{
            return res.json({
              message: "Product not found.",
              isSuccess: false
            });
          }
          if(user){
            await ORDER.updateOne({ _id: user._id }, { $push: { orderProducts: product } })
              return res.json({
                message: "Product is added.",
                isSuccess: true
              });
          }else{
            await ORDER.create({userId : decoded.user_Id , orderProducts : [product]})
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
          let exist = await ORDER.findOne({'orderProducts._id' : {"$in": [productId]}}) 
          if(!exist){
            return res.json({
              message: "This product is already in order.",
              isSuccess: true
            });
          }
            let cancelProduct = await ORDER.updateOne({'orderProducts._id': {"$in": [productId]} }, { $pull: { orderProducts : { _id : productId } } })
              
            if(cancelProduct){
              return res.json({
                message: "Product is removed.",
                isSuccess: true
              });
            }
            else{
              return res.json({
                message: "Product can not removed.",
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

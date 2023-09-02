const USER = require("../model/user");
const PRODUCT = require("../model/product");
const jwt = require("jsonwebtoken");
var fs = require('fs');

exports.product = {
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
          const product = await PRODUCT.find({ userId: decoded.user_Id });
          return res.json({
            message: "Your data get successfull",
            data: product,
            isSuccess: true
          });
        }
      });
    } catch (err) {
      return res.json({ error: 'Something wrong!!' });
    }
  },
  add: async (req, res) => {
    try {
      const { productName, price, category, shopName, mobile, discount, discription, colors } = req.body;
      if (!req.file) {
        return res.json({ isSuccess: false, error: "Image is required" });
      }
      if (!(productName && price && category && shopName && mobile && discount && discription && colors)) {
        return res.json({ isSuccess: false, error: "All input is required" });
      }

      var token = req.headers.authorization?.split(" ")[1];
      jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
        if (err) {
          return res.status(401).json({
            message: "Auth token not found",
            error: err,
            isSuccess: false,
          });
        } else {
          let allProduct = await PRODUCT.find({ userId: decoded.user_Id })
          let filePath = 'http://localhost:' + process.env.API_PORT + '/' + req.file.path;
          const product = await PRODUCT.create({
            productName, price, category, shopName, mobile, discount, discription, colors,
            userId: decoded.user_Id, productImage: filePath
          });

          if (true) {
            return res.status(200).json({
              message: "Product uploaded successfully!!",
              data: product,
              isSuccess: true
            });
          }
        }
      });
    } catch (err) {
      return res.json({ error: 'Something wrong!!' });
    }
  },
  update: async (req, res) => {
    try {

      var token = req.headers.authorization?.split(" ")[1];
      jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
        if (err) {
          return res.status(401).json({
            message: "Auth token not found",
            error: err,
            isSuccess: false,
          });
        } else {
          const userProduct = await PRODUCT.findOne({ _id: req.query.id, userId: decoded.user_Id });
          let obj = req.body;
          if (req.file) {
            let filePath = 'http://localhost:' + process.env.API_PORT + '/' + req.file.path;
            fs.unlinkSync(userProduct.productImage.split(process.env.API_PORT + '/')[1]);
            obj.productImage = filePath;
          } else {
            obj.productImage = userProduct.productImage
          }

          const product = await PRODUCT.update({ _id: req.query.id, userId: decoded.user_Id }, { $set: obj });

          if (product) {
            return res.json({
              message: "Product updated successfully!!",
              isSuccess: true
            });
          }
          else {
            return res.status(400).json({
              message: "This product is not found!!",
              isSuccess: false
            });
          }
        }
      });
    } catch (err) {
      return res.json({ error: 'Something wrong!!' });
    }
  },

  delete: async (req, res) => {
    try {

      var token = req.headers.authorization?.split(" ")[1];
      jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
        if (err) {
          return res.status(401).json({
            message: "Auth token not found",
            error: err,
            isSuccess: false,
          });
        } else {
          const userProduct = await PRODUCT.findOne({ _id: req.query.id, userId: decoded.user_Id });
          const product = await PRODUCT.findOneAndDelete({ _id: req.query.id, userId: decoded.user_Id });
          if (product) {
            fs.unlinkSync(userProduct.productImage.split(process.env.API_PORT + '/')[1]);
            res.status(200).json({
              isSuccess: true,
              message: "Product deleted successfully!!"
            });
          }
          else {
            res.status(200).json({
              isSuccess: true,
              message: "This product is not found!!"
            });
          }
        }
      });
    } catch (err) {
      return res.json({ error: 'Something wrong!!' });
    }
  },

};

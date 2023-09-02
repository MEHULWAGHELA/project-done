const productController = require('../Controllers/productController')
const express = require("express");
const router = express.Router();
const multer = require('multer')
const path = require('path')
uuidv4 = require('uuid/v4')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/product/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
    cb(null, true);
} else {
    cb(null, false);
}
}
const uploadPost = multer({ storage: storage, fileFilter: fileFilter }).single('productImage');

router.get('/get' , (req,res) => productController.product.get(req,res))
router.post('/add' , uploadPost , (req,res) => productController.product.add(req,res))
router.patch('/update' ,uploadPost, (req,res) => productController.product.update(req,res))
router.delete('/delete' , (req,res) => productController.product.delete(req,res))

module.exports = router;
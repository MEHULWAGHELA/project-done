const userController = require('../Controllers/userController')
const express = require("express");
const router = express.Router();
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/user/');
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
const uploadPost = multer({ storage: storage, fileFilter: fileFilter }).single('userImage');


router.post('/register', uploadPost , (req,res) => userController.user.register(req,res))
router.post('/login' , (req,res) => userController.user.login(req,res))
router.delete('/delete' , (req,res) => userController.user.delete(req,res))
router.get('/getUser' , (req,res) => userController.user.getUser(req,res))

module.exports = router;
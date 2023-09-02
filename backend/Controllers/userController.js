const USER = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var fs = require('fs');
exports.user = {
  getUser: async (req, res) => {
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
          const user = await USER.findOne({_id: decoded.user_Id});
          if(user){
            res.status(200).json({
              message: "User find successfully",
              data : user,
              isSuccess: true
            });
          }
          else{
            return res.status(200).json({
              isSuccess: true,
              message: "User is not found!!"
            });
          }
        }
      });
    } catch (error) {
      return res.json({error: 'Something wrong!!'});
    }
  },
  delete: async (req, res) => {
    try {
      let { userEmail } = req.query;
      if (!(userEmail)) {
        return res.status(400).json({
          isSuccess : false,
          error : "Email is required!"
        })
      }
      const user = await USER.findOne({email: userEmail});
      if(user){
          let deletedUser = await USER.findByIdAndRemove({_id: user._id});
          if(deletedUser){
            fs.unlinkSync(deletedUser.userImage);
            return res.json({
              isSuccess : true,
              message: "User deleted successfully"
            });
          }
      }
      else{
        return res.json({
          isSuccess: true,
          message: "User is not found"
        });
      }

    } catch (error) {
      return res.json({error: 'Something wrong!!'});
    }
  },
  login: async (req, res) => {
    try {
      let userInfo = await USER.findOne({
        email: req.body.email,
      });
      if (!userInfo) {
        return res.status(400).json({
          isSuccess : false,
          error : "Email not found!"
        })
      }
      if (!bcrypt.compareSync(req.body.password, userInfo.password)) {
        return res.status(400).json({
          isSuccess : false,
          error : "Authentication failed. Wrong password."
        })
      }

      var token = jwt.sign({user_Id : userInfo._id, userName : userInfo.userName}, process.env.TOKEN_KEY, {
        expiresIn: "2h",
      });
      jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
        if (err) {
          return res.json({
            message: "Auth token not found",
            error: err,
            isSuccess: false,
          });
        } else {
          return res.status(200).send({
            isSuccess : true,
            message: "You are logged in successfully!",
            token : token,
            expiresIn : decoded.exp
          });
        }
      });
      
    } catch (error) {
      return res.json({error: 'Something wrong!!'});
    }
  },
  register: async function (req, res) {
    try {
      let { userName, email, mobile, gender,city , state, country, postalCode, address, officeContact, birthDate,qualification, password, confirmPassword } = req.body;
      const file = req.file;
      if(!file){
        return res.json({  isSuccess : false, error : "Image size must be Required!!" });
      }
      if (!(userName && email && mobile && gender && city && state && country && postalCode && address && officeContact && birthDate && qualification && password && confirmPassword && file)) {
        return res.json({  isSuccess : false, error : "All input is required" });
      }
      const userInfo = await USER.findOne({ email });
      if (userInfo) {
        return res.status(400).json({
          isSuccess : false,
          error : "Email already exist!"
        })
      }
      if (password !== confirmPassword) {
        return res.status(400).json({
          isSuccess : false,
          error : "Password and Confirm Password must be same"
        })
      }
        bcrypt.hash(confirmPassword, 10).then(async (hash) => {
          password = hash;
          let filePath = 'http://localhost:'+process.env.API_PORT + '/' + req.file.path;
          const user = await USER.create({ userName, email, mobile, gender,city , state, country, postalCode, address, officeContact, qualification, birthDate, password, userImage : filePath });

          if(user){
            return res.status(200).json({
              isSuccess : true,
              message: "User created successfully",
              data: user,
            });
          }
        })
        .catch((err) => {
          return res.status(400).json(err);
        });
    } catch (error) {
      return res.json({error: 'Something wrong!!'});
    }
  },
};
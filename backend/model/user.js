const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: Number,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true, 
      lowercase: true,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    qualification:{
      type: String,
      required: true,
      trim: true
    },
    city : {
      type: String,
      required: true,
      trim: true,
    },
    state : {
      type: String,
      required: true,
      trim: true,
    },
    country : {
      type: String,
      required: true,
      trim: true,
    },
    postalCode : {
      type: Number,
      required: true,
      trim: true,
    },
    address : {
      type: String,
      required: true,
      trim: true,
    },
    officeContact : {
      type: Number,
      required: true,
      trim: true,
    },
    birthDate:{
      type: Date,
      required: true,
      trim: true,
    },
    userImage: {
      type: String,
      trim: true,
      default: "",
      required :true
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", UserSchema);
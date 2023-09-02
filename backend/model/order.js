var mongoose = require("mongoose");
const PRODUCT = require("../model/product");
var orderSchema = new mongoose.Schema(
  {
    userId : {
        type : String,
        trim : true,
        default :'',
        required :true
    },
    orderProducts : [{type: PRODUCT.schema}] 
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("order", orderSchema);
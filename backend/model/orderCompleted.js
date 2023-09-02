var mongoose = require("mongoose");
const PRODUCT = require("./product");

var orderCompletedSchema = new mongoose.Schema(
  {
    userId : {
        type : String,
        trim : true,
        default :'',
        required :true
    },
    orderCompletedProducts : [{type: PRODUCT.schema}] 
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("orderComplated", orderCompletedSchema);
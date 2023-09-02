var mongoose = require("mongoose");
var addToCartSchema = new mongoose.Schema(
  {
    userId : {
        type : String,
        trim : true,
        default :'',
        required :true
    },
    cartProducts : [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' , unique: true}] 
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("addtocart", addToCartSchema);

const ORDER = require("../model/order");
const ORDER_COMPLETED = require("../model/orderCompleted");
const jwt = require("jsonwebtoken");

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
              const user = await ORDER_COMPLETED.findOne({ userId: decoded.user_Id });
              let completedRecords = records.orderProducts.filter(x => x.orderComplateTime < new Date())
            
              await ORDER.update(   
                  { userId: decoded.user_Id },
                  {
                      $pull: {
                        orderProducts: { _id : completedRecords.map(x => x._id) }
                      }
                  },
                  { safe: true }
              );

            if(completedRecords.length > 0){
              const user = await ORDER_COMPLETED.findOne({ userId: decoded.user_Id });
              if(user){
                await ORDER_COMPLETED.updateOne({ userId: decoded.user_Id }, { $push : { orderCompletedProducts: {$each: completedRecords, $slice: -10   }} })
              }else{
                await ORDER_COMPLETED.create({ userId: decoded.user_Id , orderCompletedProducts: completedRecords })
              }
            }
          }
          // const user = await ORDER_COMPLETED.findOne({ userId: decoded.user_Id });
          // if(user && user?.orderCompletedProducts?.length > 10){
          //   const slicedArray = user?.orderCompletedProducts.slice(0 , user?.orderCompletedProducts?.length-10)?.map(x => x._id);
          //   console.log(slicedArray)
          //   await ORDER_COMPLETED.update(
          //     {_id: user._id},
          //     {"$pull":{"orderCompletedProducts":{"_id":{$in:slicedArray}}}}
          //   )
          // }
          const orders = await ORDER_COMPLETED.findOne({ userId : decoded.user_Id});
          return res.json({
            message: "Your data get successfull",
            isSuccess: true,
            data: orders?.orderCompletedProducts ?? []
          });
        }
      });
    } catch (err) {
      return res.json({error: 'Something wrong!!'});
    }
  }
};

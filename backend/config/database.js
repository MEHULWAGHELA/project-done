const mongoose = require('mongoose');

const { MONGO_URL } = process.env;

exports.connect = () => {
        mongoose.connect(MONGO_URL , {
        useNewUrlParser : true,
    }).then(() => {
        console.log("Successfully connected to database");
    }).catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
      });
}
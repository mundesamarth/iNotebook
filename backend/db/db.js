const mongoose = require("mongoose");
const dbConnector = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB is running Gang");
  } catch (error) {
    console.log("Connection error", error);
  }
};

module.exports = dbConnector;

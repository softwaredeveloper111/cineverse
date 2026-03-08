const mongoose = require("mongoose");





async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connect to database.")
  } catch (error) {
    console.error(`connection problem ❌ ${error.message}`)
  }
}



module.exports = connectToDB
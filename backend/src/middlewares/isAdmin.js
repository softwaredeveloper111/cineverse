
const userModel = require("../models/user.model.js")
const asyncHandler = require("./asyncHanlder")
const AppError = require("../utils/AppError")


const isAdmin =  asyncHandler(async (req,res,next)=>{
  const userId = req.user.id;
  const user = await userModel.findById(userId);

  if(!user){
    throw new AppError("user not found", 404)
  }

  if(user.role==="user"){
    throw new AppError("you have no permission to perfrom this action", 403)
  }
  
  next()

})


module.exports = isAdmin
const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHanlder')
const AppError = require('../utils/AppError')
const redis = require('../config/caching')



const identifyingUser = asyncHandler(async (req,res,next)=>{
  const token = req.cookies?.JWT_TOKEN
  if(!token){
    throw new AppError("unthrorized access - null" , 401)
  }

  const isBlackListToken = await redis.get(token);

   if(isBlackListToken){
     throw new AppError("try to unthrorized access - blacklist Token" , 401)
   }
  
 try {
  const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
  req.user = decoded;
  next()
  
 } catch (error) {
     throw new AppError("Invalid token" , 401)
 }

})



module.exports = identifyingUser
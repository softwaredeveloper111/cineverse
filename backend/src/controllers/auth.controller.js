const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model");
const asyncHandler = require("../middlewares/asyncHanlder");
const AppError = require("../utils/AppError");
const redis = require('../config/caching')




/** register user ,controller */

const registerController = asyncHandler(async(req,res)=>{
  const {username,email,password,role} = req.body;
  const isUserAlreadyRegistered = await userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  })

  if(isUserAlreadyRegistered){
    throw new AppError("user already registered",409)
  }
   
  const hashPassword = await bcrypt.hash(password,Number(process.env.GEN_SALT))
  
  const user = await userModel.create({
    username,
    email,
    password: hashPassword,
    role,
  });

  const token = jwt.sign({id:user._id,username:user.username} , process.env.JWT_SECRET_KEY,{expiresIn:"1d"});

  res.cookie("JWT_TOKEN",token,{
  httpOnly: true,  
  secure: process.env.NODE_ENV === "PRODUCTION",
  maxAge: 24 * 60 * 60 * 1000  
});

  const userObj = user.toObject();
  delete userObj.password;

  res.status(201).json({
    sucess:true,
    data:userObj
  })


})





/** login user , controller */
const loginController =  asyncHandler(async(req,res)=>{

  const {identifier,password} = req.body;

  const isUserRegistred = await userModel.findOne({
    $or:[
      {username:identifier},
      {email:identifier},
    ]
  }).select("+password")
  

  if(!isUserRegistred){
    throw new AppError("invalid credentials - user not found",404);
  }

  
  const isPasswordMatch = await bcrypt.compare(password,isUserRegistred.password);

  if(!isPasswordMatch){
    throw new AppError("invalid credentials - wrong password",401)
  }


  const token = jwt.sign({id:isUserRegistred._id,username:isUserRegistred.username} , process.env.JWT_SECRET_KEY,{expiresIn:"1d"});

  res.cookie("JWT_TOKEN",token,{
  httpOnly: true,  
  secure: process.env.NODE_ENV === "PRODUCTION",
  maxAge: 24 * 60 * 60 * 1000  
});

  const userObj = isUserRegistred.toObject();
  delete userObj.password;

  res.status(200).json({
    sucess:true,
    data:userObj
  })

})





/** get me profile details , controller */

const getMeController = asyncHandler(async (req,res)=>{
  const userId = req.user.id;
  
  const user = await userModel.findById(userId);

  if(!user){
    throw new AppError("user not found",404)
  }

  if(user.banned){
     throw new AppError("your account has been banned", 403)
  }

  res.status(200).json({
    success:true,
    data:user
  })

})







/** logout , controller */
const logOutController = asyncHandler(async(req,res)=>{
   const token = await req.cookies?.JWT_TOKEN;
   redis.set(token,Date.now().toString() , "EX", 60*60*60)
   res.clearCookie("JWT_TOKEN");
   res.status(200).json({
    success:true,
    message:"user logout successfully"
   })
})














module.exports = {registerController ,loginController, getMeController ,logOutController}
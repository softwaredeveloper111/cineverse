
const userModel = require("../models/user.model")
const asyncHandler = require("../middlewares/asyncHanlder")
const AppError = require('../utils/AppError')






/** get all the users(including admin) excluding me as a admin , controller */
const  getAllUsersListController = asyncHandler(async (req,res)=>{

const allUsersList = await userModel.find({ _id: { $ne: req.user.id } });

res.status(200).json({
  success:true,
  data: allUsersList
})


})




/** ban a user , controller */
const banUserController = asyncHandler(async(req,res)=>{

  const userId = req.params.id;
  const banUser = await userModel.findByIdAndUpdate( userId, { banned:true},{new:true});
  
  if(!banUser) throw new AppError("user not found", 404)

  res.status(200).json({
    sucess:true,
    data:banUser
  })

})





/** delete a user, controller */
const deleteUserController = asyncHandler(async(req,res)=>{
  const userId = req.params.id;

  const response = await userModel.findByIdAndDelete(userId);

  if(!response){
     throw new AppError("user not found" , 404)
  }
  
  res.status(200).json({
    success:true,
    message:"user delete sucessfully"
  })



})









module.exports = {getAllUsersListController ,banUserController ,deleteUserController}
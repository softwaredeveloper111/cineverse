const watchHistoryModel = require("../models/watchHisotry.model")
const asyncHandler = require("../middlewares/asyncHanlder")
const AppError = require("../utils/AppError")







const addHistoryController = asyncHandler(async(req,res)=>{

  const userId = req.user.id;
  const {movieId,movieData} = req.body;

  const watchHistory = await watchHistoryModel.findOneAndUpdate(
  { userId, movieId },
  { userId, movieId, movieData, watchedAt: Date.now() },
  { upsert: true, new: true }
)

  res.status(201).json({
    success:true,
    data:watchHistory
  })

})





const  getHistoryController  = asyncHandler(async(req,res)=>{

  const userId = req.user.id;
  const watchHistory = await watchHistoryModel.find({userId})

  res.status(200).json({
    success:true,
    data:watchHistory
  })

})





module.exports = {addHistoryController , getHistoryController }
const favouriteModel = require("../models/favourite.model")
const asyncHandler = require("../middlewares/asyncHanlder")
const AppError = require("../utils/AppError")








const addToFavouriteController = asyncHandler(async(req,res)=>{

const userId = req.user.id
const {movieId,movieData} = req.body

const alreadyExists =await  favouriteModel.findOne({userId,movieId})

if(alreadyExists){
  throw new AppError("already favourite" , 409)
}

const favourite = await favouriteModel.create({
  userId,
  movieId,
  movieData
})


res.status(201).json({
  success:true,
  data:favourite
})

})






const removeFavouriteController = asyncHandler(async(req,res)=>{

const movieId = req.params.movieId;
const userId = req.user.id;
const isFavouriteMovie = await favouriteModel.findOneAndDelete({
  movieId,
  userId,
})


if(!isFavouriteMovie){
  throw new AppError("only favourite movie can be removed",400)
}


 res.status(200).json({
  success:true,
  message:"remove favourite succesfully"
 })


})






const getAllFavouriteController = asyncHandler(async(req,res)=>{

const userId = req.user.id;
const allFavouriteLists = await favouriteModel.find({userId});

res.status(200).json({
  success:true,
  allFavouriteLists,
})

})








module.exports = {addToFavouriteController ,removeFavouriteController ,getAllFavouriteController}
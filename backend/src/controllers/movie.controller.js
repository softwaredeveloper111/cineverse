const movieModel = require("../models/movie.model")
const asyncHandler = require('../middlewares/asyncHanlder')
const AppError = require("../utils/AppError")





/** admin can only add a movie, controller */

const addMovieController = asyncHandler(async (req,res)=>{
  const userId = req.user.id
  const {title, poster,  description , movieId, releaseDate,  trailerLink, genre, category, rating } = req.body;

  const movie = await movieModel.create({
    title, 
    poster,  
    description , 
    movieId, 
    releaseDate,  
    trailerLink, 
    genre, 
    category, 
    rating,
    createdBy:userId,
  })

  res.status(201).json({
    success:true,
    data:movie
  })

})






/** admin can only update a movie, controller */
const updateMovieController = asyncHandler(async(req,res)=>{
    
    const movieDocumentId = req.params.id;
    const {title, poster,  description , movieId, releaseDate,  trailerLink, genre, category, rating } = req.body;
    const updatedMovie = await movieModel.findByIdAndUpdate(movieDocumentId,{
      title, poster,  description , movieId, releaseDate,  trailerLink, genre, category, rating
    },{new:true});

    if(!updatedMovie){
   throw new AppError("movie not found", 404)
     }

    res.status(200).json({
      success:true,
      data:updatedMovie
    })

})






/** admin can only delete a movie , controller */
const deleteMovieController = asyncHandler(async(req,res)=>{

    const movieDocumentId = req.params.id;
    const result = await movieModel.findByIdAndDelete( movieDocumentId )
    if(!result){
      throw new AppError("movie not found",404)
    }
    res.status(200).json({
      success:true,
      message:"movie deleted sucessfully"
    })
})







/** get all the movies (with genre filter + infinte scrolling) - public controller  */
const getAllMoviesController =  asyncHandler(async(req,res)=>{
 const genre = req.query?.genre
 const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;
const skip = (page - 1) * limit;

const query = genre ? { genre: { $in: [genre] } } : {};
const movies = await movieModel.find(query).skip(skip).limit(limit);
const totalMovies = await movieModel.countDocuments(query);

res.status(200).json({
  success: true,
  data: movies,
  pagination: {
    currentPage: page,
    totalPages: Math.ceil(totalMovies / limit),
    totalMovies,
    hasMore: page < Math.ceil(totalMovies / limit)
  }
})
})







/** get a single movie by id, controller */

const getMovieByIdController = asyncHandler(async (req,res)=>{
  const movieDocumentId = req.params.id;
  const movie = await movieModel.findById(movieDocumentId)
  if(!movie){
    throw new AppError('movie not found',404)
  }
 
  res.status(200).json({
    success:true,
    data:movie
  })

})











module.exports = {addMovieController ,updateMovieController ,deleteMovieController ,getAllMoviesController,getMovieByIdController}
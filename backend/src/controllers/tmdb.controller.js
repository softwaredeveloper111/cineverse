
const asyncHandler = require('../middlewares/asyncHanlder')
const AppError = require("../utils/AppError")
const instance = require("../utils/tmdbAxios")








const tmdbTredingController = asyncHandler(async(req,res)=>{
 
  const response = await instance.get(`/trending/all/week`);

res.status(200).json({
  success: true,
  data: response.data
});

})






const tmdbPopularMovieController = asyncHandler(async(req,res)=>{
  const response = await instance.get(`/movie/popular`)
 
  res.status(200).json({
    success:true,
    data:response.data
  })

}) 






const tmdbPopularTvController = asyncHandler(async(req,res)=>{
  const response = await instance.get(`/tv/popular` )
 
  res.status(200).json({
    success:true,
    data:response.data
  })

}) 







const tmdbNowPlayingMOvieController = asyncHandler(async(req,res)=>{
  const response = await instance.get(`/movie/now_playing`)
 
  res.status(200).json({
    success:true,
    data:response.data
  })

}) 







const tmdbOnThePlayerTvController = asyncHandler(async(req,res)=>{
  const response = await instance.get(`/tv/on_the_air` )
 
  res.status(200).json({
    success:true,
    data:response.data
  })

}) 







const tmdbPopularPersonController = asyncHandler(async(req,res)=>{
  const response = await instance.get(`/person/popular`)
 
  res.status(200).json({
    success:true,
    data:response.data
  })

}) 







const tmdbMultiSearchController = asyncHandler(async(req,res)=>{
  const {query} = req.query
  const response = await instance.get(`/search/multi?query=${query}`)
 
  res.status(200).json({
    success:true,
    data:response.data
  })

}) 







const tmdbMOvieTrailerController = asyncHandler(async(req,res)=>{
  const id = req.params.id;
  const response = await instance.get(`/movie/${id}/videos` )
 
  res.status(200).json({
    success:true,
    data:response.data
  })

}) 





const   tmdbTVTrailerController = asyncHandler(async(req,res)=>{
  const id = req.params.id;
  const response = await instance.get(`/tv/${id}/videos`)
 
  res.status(200).json({
    success:true,
    data:response.data
  })

}) 













module.exports = {tmdbTredingController,
  tmdbPopularMovieController,
  tmdbPopularTvController ,
  tmdbNowPlayingMOvieController,
  tmdbOnThePlayerTvController,
  tmdbPopularPersonController,
  tmdbMultiSearchController,
  tmdbMOvieTrailerController,
  tmdbTVTrailerController,
}
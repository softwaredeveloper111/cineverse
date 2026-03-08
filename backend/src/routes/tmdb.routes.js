const express = require("express");
const {tmdbTredingController,
  tmdbPopularMovieController,
  tmdbPopularTvController,
  tmdbNowPlayingMOvieController,
  tmdbOnThePlayerTvController,
  tmdbPopularPersonController,
  tmdbMultiSearchController,
  tmdbMOvieTrailerController,
  tmdbTVTrailerController,

 } = require('../controllers/tmdb.controller')




const tmdbRouter = express.Router();







/**
 * @method       GET
 * @route       /api/tmdb/trending
 * @description    get trending movies
 */

tmdbRouter.get("/trending", tmdbTredingController)






/**
 * @method       GET
 * @route       /api/tmdb/movie/popular
 * @description    get popular movies
 */

tmdbRouter.get("/movie/popular", tmdbPopularMovieController)






/**
 * @method       GET
 * @route       /api/tmdb/tv/popular
 * @description    get popular movies
 */

tmdbRouter.get("/tv/popular", tmdbPopularTvController)





/**
 * @method       GET
 * @route       /api/tmdb/movie/now_playing
 * @description    abhi cinemas mein chal rahi movies dega 
 */

tmdbRouter.get("/movie/now_playing", tmdbNowPlayingMOvieController)





/**
 * @method       GET
 * @route       /api/tmdb/tv/on_the_air
 * @description     abhi broadcast ho rahe TV shows dega
 */

tmdbRouter.get("/tv/on_the_air", tmdbOnThePlayerTvController)








/**
 * @method       GET
 * @route       /api/tmdb/person/popular
 * @description     Popular actors, directors, crew members ka data dega
 */

tmdbRouter.get("/person/popular", tmdbPopularPersonController)







/**
 * @method         GET
 * @route         /api/tmdb/search/multi?query=YOUR_QUERY
 * @description   Ek hi API call mein movies + TV shows + people teeno search karta hai simultaneously.
 */

tmdbRouter.get("/search/multi", tmdbMultiSearchController)








/**
 * @method         GET
 * @route         /api/tmdb/movie/id/videos
 * @description   watch trailer of a particular movie
 */

tmdbRouter.get("/movie/:id/videos", tmdbMOvieTrailerController)







/**
 * @method         GET
 * @route         /api/tmdb/tv/id/videos
 * @description   watch trailer of a particular movie
 */

tmdbRouter.get("/tv/:id/videos", tmdbTVTrailerController)












module.exports = tmdbRouter


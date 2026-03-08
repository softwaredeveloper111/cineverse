const express = require("express");
const {addMovieController , updateMovieController ,deleteMovieController ,getAllMoviesController, getMovieByIdController} = require("../controllers/movie.controller")
const identifyingUser = require('../middlewares/auth.middleware')
const isAdmin = require("../middlewares/isAdmin")
const {addMovieValidation ,updateMovieValidation ,checkMongoIdValidation} = require("../validators/movie.validator")



const movieRouter = express.Router();







/**
 * @method       POST
 * @route        /api/movies
 * @description   admin can only add movie
 * 
 */
movieRouter.post("/", addMovieValidation, identifyingUser , isAdmin,    addMovieController)






/**
 * @method       PUT
 * @route        /api/movies/:id
 * @description   admin can only update the movie
 * 
 */
movieRouter.put("/:id", updateMovieValidation,  identifyingUser , isAdmin,    updateMovieController)






/**
 * @method       DELETE
 * @route        /api/movies/:id
 * @description   admin can only delete the movie
 * 
 */
movieRouter.delete("/:id", checkMongoIdValidation, identifyingUser , isAdmin,  deleteMovieController)






/**
 * @method       GET
 * @route        /api/movies
 * @description   get all the movies with genre filter + infinte scrolling, public route. 
 * 
 */
movieRouter.get("/",  getAllMoviesController)






/**
 * @method       GET
 * @route        /api/movies/:id
 * @description   get single movie
 * 
 */
movieRouter.get("/:id", checkMongoIdValidation , getMovieByIdController)















module.exports = movieRouter
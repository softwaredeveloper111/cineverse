const express = require("express");
const identifyingUser = require("../middlewares/auth.middleware.js")
const {addToFavouriteController ,removeFavouriteController ,getAllFavouriteController} = require("../controllers/favourite.controller")





const favouriteRouter = express.Router();







/**
 * @method     POST
 * @route      /api/favourites
 * @description   add to favourites
 */
favouriteRouter.post("/" , identifyingUser , addToFavouriteController )







/**
 * @method     DELETE
 * @route      /api/favourites/movieId
 * @description   add to favourites
 */
favouriteRouter.delete("/:movieId" , identifyingUser , removeFavouriteController )








/**
 * @method     GET
 * @route      /api/favourites/
 * @description   add to favourites
 */
favouriteRouter.get("/" , identifyingUser , getAllFavouriteController )











module.exports = favouriteRouter
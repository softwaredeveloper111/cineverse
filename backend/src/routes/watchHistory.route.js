const express = require("express");
const identifyingUser = require("../middlewares/auth.middleware")
const {addHistoryController , getHistoryController } = require("../controllers/watchhistory.controller")




const watchHistoryRouter = express.Router();






/**
 * @method    POST
 * @route     /api/watchhistory
 * @description  movie add to tha addHistory
 * 
 */

 watchHistoryRouter.post("/", identifyingUser , addHistoryController )






/**
 * @method    GET
 * @route     /api/watchhistory
 * @description  movie add to tha addHistory
 * 
 */

 watchHistoryRouter.get("/", identifyingUser , getHistoryController )










module.exports = watchHistoryRouter
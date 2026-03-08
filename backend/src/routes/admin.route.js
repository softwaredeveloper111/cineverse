const express = require("express");
const identifyingUser = require("../middlewares/auth.middleware")
const isAdmin = require("../middlewares/isAdmin")
const {getAllUsersListController , banUserController ,deleteUserController}  = require("../controllers/admin.controller")
const {checkMongoIdValidation}  = require("../validators/movie.validator")


const adminRouter =express.Router();




/**
 * @method           GET
 * @route            /api/admin/users
 * @description      get all users list
 */
adminRouter.get("/users", identifyingUser ,isAdmin , getAllUsersListController)






/**
 * @method           PATCH
 * @route            /api/admin/users/:id/ban
 * @description      user ko ban karo
 */
adminRouter.patch("/users/:id/ban", checkMongoIdValidation, identifyingUser ,isAdmin , banUserController)





/**
 * @method           DELETE
 * @route            /api/admin/users/:id
 * @description      user ko delete karo
 */
adminRouter.delete("/users/:id", checkMongoIdValidation, identifyingUser ,isAdmin , deleteUserController)









module.exports = adminRouter
const express = require('express');
const {registerController ,loginController, getMeController ,logOutController } = require("../controllers/auth.controller")
const {registerValidaion ,loginValidation} = require("../validators/authValidator")
const identifyingUser = require('../middlewares/auth.middleware')

const authRouter = express.Router();







/**
 * @method        POST
 * @route         /api/auth/register
 * @description   new user register, create new account, save their information in database. client get a token
 * @body           {username,email,password} = req.body
 */

authRouter.post("/register", registerValidaion ,registerController)






/**
 *  @method         POST
 * @route          /api/auth/login
 * @description    registered user can login, and  client get a token
 * @body           {identifier, password} = req.body
 */
authRouter.post("/login", loginValidation, loginController )








/**
 *  @method         GET
 * @route          /api/auth/me
 * @description    get the user details
 */

authRouter.get("/me", identifyingUser, getMeController )





/**
 * @method         POST
 * @route          /api/auth/logout
 * @description     logout the current account user
 */

authRouter.post("/logout", identifyingUser, logOutController )










module.exports = authRouter
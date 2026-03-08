const expressValidator  =  require("express-validator");

const { body, param, query, validationResult } = expressValidator



const registerValidaion = [

body("username")
.trim()
.notEmpty().withMessage("username is required")
.isLength({min:3}).withMessage("username must be minimum 3 character required")
.isLength({max:20}).withMessage("username 20 characters length exceed")
.matches(/^\S+$/).withMessage("username cannot contain spaces"),



body("email")
.trim()
.notEmpty().withMessage("email is required")
.isEmail().withMessage("enter a valid email address")
.normalizeEmail(),




body("password")
.trim()
.notEmpty().withMessage("password is required")
.isLength({min:8}).withMessage("password must be at least 8 characters")
.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/)
.withMessage("password must contain uppercase, lowercase, number and special character (!@#$%^&*)")

,
 (req, res, next)=> {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {

      const error = new Error("Validation failed")
      error.status = 400
      error.details = errors.array()

      return next(error)

    }

    next()

  }


]




const loginValidation = [
  body("identifier")
  .trim()
  .notEmpty().withMessage("identifier should be required")
  ,

  body("password")
  .trim()
  .notEmpty().withMessage("password should be required")

  ,

   (req, res, next)=> {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {

      const error = new Error("Validation failed")
      error.status = 400
      error.details = errors.array()

      return next(error)

    }

    next()

  }


]






module.exports = {registerValidaion ,loginValidation}
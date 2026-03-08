const expressValidator  =  require("express-validator");

const { body, param, query, validationResult } = expressValidator




const addMovieValidation = [

  body("title")
    .trim()
    .notEmpty().withMessage("title is required")
    .isLength({max:100}).withMessage("title cannot exceed 100 characters"),

  body("poster")
    .trim()
    .notEmpty().withMessage("poster url is required")
    .isURL().withMessage("poster must be a valid URL"),

  body("description")
    .trim()
    .notEmpty().withMessage("description is required")
    .isLength({min:10}).withMessage("description must be at least 10 characters")
    .isLength({max:1000}).withMessage("description cannot exceed 1000 characters"),

  body("movieId")
    .trim()
    .notEmpty().withMessage("movieId is required"),

  body("releaseDate")
    .notEmpty().withMessage("releaseDate is required")
    .isISO8601().withMessage("releaseDate must be a valid date"),

  body("trailerLink")
    .optional()
    .matches(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/)
    .withMessage("trailerLink must be a valid YouTube URL"),

  body("genre")
    .isArray({min:1}).withMessage("at least one genre is required"),

  body("genre.*")
    .isIn(["Action","Adventure","Animation","Comedy","Crime","Documentary","Drama","Fantasy","Horror","Mystery","Romance","Sci-Fi","Thriller","Western","Biography","History","Music","Sport","Family"])
    .withMessage("invalid genre value"),

  body("category")
    .notEmpty().withMessage("category is required")
    .isIn(["movie","tv","trending","popular","people"])
    .withMessage("invalid category value"),

  body("rating")
    .optional()
    .isFloat({min:0, max:10}).withMessage("rating must be between 0 and 10"),

  (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      const error = new Error("Validation failed")
      error.status = 400
      error.details = errors.array()
      return next(error)
    }
    next()
  }

]


const updateMovieValidation = [


  param("id")
  .isMongoId().withMessage("id should be valid mongodb doc id")
  .notEmpty().withMessage("id should be required"),

   body("title")
    .optional()
    .trim()
    .isLength({max:100}).withMessage("title cannot exceed 100 characters"),

  body("poster")
    .optional()
    .trim()
    .isURL().withMessage("poster must be a valid URL"),

  body("description")
    .optional()
    .trim()
    .isLength({min:10}).withMessage("description must be at least 10 characters")
    .isLength({max:1000}).withMessage("description cannot exceed 1000 characters"),

  body("movieId")
    .optional()
    .trim(),
    

  body("releaseDate")
    .optional()
    .isISO8601().withMessage("releaseDate must be a valid date"),

  body("trailerLink")
    .optional()
    .matches(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/)
    .withMessage("trailerLink must be a valid YouTube URL"),

  body("genre")
    .optional()
    .isArray({min:1}).withMessage("at least one genre is required"),

  body("genre.*")
    .optional()
    .isIn(["Action","Adventure","Animation","Comedy","Crime","Documentary","Drama","Fantasy","Horror","Mystery","Romance","Sci-Fi","Thriller","Western","Biography","History","Music","Sport","Family"])
    .withMessage("invalid genre value"),

  body("category")
    .optional()
    .isIn(["movie","tv","trending","popular","people"])
    .withMessage("invalid category value"),

  body("rating")
    .optional()
    .isFloat({min:0, max:10}).withMessage("rating must be between 0 and 10"),

  (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      const error = new Error("Validation failed")
      error.status = 400
      error.details = errors.array()
      return next(error)
    }
    next()
  }

]


const checkMongoIdValidation = [
  param("id")
  .isMongoId().withMessage("id should be valid mongodb doc id")
  .notEmpty().withMessage("id should be required"),

    (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      const error = new Error("Validation failed")
      error.status = 400
      error.details = errors.array()
      return next(error)
    }
    next()
  }
]




module.exports = {addMovieValidation ,updateMovieValidation ,checkMongoIdValidation}
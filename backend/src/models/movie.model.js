const mongoose = require("mongoose");




const movieSchema = new mongoose.Schema({

  title:{
    type:String,
    trim:true,
    required:[true,"movie title should be required"],
    maxLength:[100,"movie title 100 character exceed"]
  },
  
  poster:{
  type:String,
  required:[true,"poster url should be required"],
  validate:{
    validator: function(value){
      return /^https?:\/\/.+\..+/.test(value)
    },
    message:"poster must be a valid URL"
  }
},

  description:{
    type:String,
    required:[true,"movie description should be required"],
    minLength:[10,"minimum 10 character needed for movie description"],
    maxLength:[1000,"movie description maximum 1000 character exceed"],
  },

  movieId:{
    type:String,
    required:[true,"movie id should be required"],
    unique:[true,"duplicate movie id not allow"]

  },

  releaseDate :{
    type:Date,
    required:[true,"release date should be required"]
  },

  
  trailerLink:{
    type:String,
    validate:{
     
      validator:function(value){
        return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/.test(value)
      },
      message:"invlaid trailerLink"
  
  }
},

  genre:{
  type:[String],
  validate:{
    validator: function(value){
      return Array.isArray(value) && value.length >= 1
    },
    message:"at least one genre is required"
  },
  enum:{
    values:["Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller", "Western", "Biography", "History", "Music", "Sport", "Family"],
    message:"genre should be in between given list"
  }
},

  category:{
    type:String,
    enum:{
      values:["movie", "tv", "trending", "popular", "people"],
      message:"value should be b/w movie,tv,trending,popular,people"
    },
    required:[true,"category should be required"],
  },

  rating:{
    type:Number,
    min:[0,"movie rating value minimum 0 "],
    max:[10,"movie rating value not be exceed 10"],
    default:0
  },

  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    required:[true,"admin Id should be required"],
    ref:"user"
  },

},{timestamps:true})



const movieModel = mongoose.model("movie",  movieSchema )



module.exports = movieModel
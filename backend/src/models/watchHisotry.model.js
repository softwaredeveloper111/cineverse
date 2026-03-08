const mongoose = require('mongoose');



const watchHistorySchema = new mongoose.Schema({

    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user",
      required:[true,"user id should be required"],
      
    },

     movieId:{
     type:String,
     required:[true,"movie id should be required"],
    },

    movieData: {
      title: String,
      poster: String,
      description: String,
      rating: Number,
      releaseDate: Date,
      genre: [String],
      category: String,
      trailerLink: String
    },

    watchedAt:{
      type:Date,
      default:Date.now
    }



},{timestamps:true})



const watchHistoryModel = mongoose.model("watchHistory", watchHistorySchema)


module.exports = watchHistoryModel
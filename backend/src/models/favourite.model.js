const mongoose = require("mongoose");



const favouriteSchema = new mongoose.Schema({
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
}


},{timestamps:true})



favouriteSchema.index({movieId:1,  userId:1}, {unique:true});


const favouriteModel = mongoose.model("favourite", favouriteSchema)



module.exports = favouriteModel
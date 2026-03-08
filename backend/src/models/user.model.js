const mongoose = require("mongoose");




const userSchema = new mongoose.Schema({
  username:{
    type:String,
    trim:true,
    required:[true,"username should be required"],
    unique:[true,"username already used"],
    minLength:[3,"Username must be at least 3 characters"],
    maxLength:[20,"Username cannot exceed 20 characters"],
    validate: {
       validator: function(value) {
        return !/\s/.test(value); 
       },

      message: 'Username cannot contain spaces'
  }
},


  email:{
    type:String,
    trim:true,
    required:[true,"email should be required"],
    unique:[true,"email already used"],
    lowercase:true,
    validate: {
    validator: function(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    },
    message: 'Please enter a valid email address'
  }
  },



  password:{
    type:String,
    trim:true,
    required:[true,"password should be required"],
    minLength:[8,'Password must be at least 8 characters'],
    validate: {
    validator: function(value) {

      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(value);
     },
    message: 'Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character (!@#$%^&*)'
  },
},



  role:{
    type:String,
    enum:{
      values:["admin","user"],
      message:"role must be either  'admin' or 'user'"
    },
    default:"user"
  },



  banned:{
    type:Boolean,
    default:false
  }

})



const userModel = mongoose.model("user",userSchema);



module.exports = userModel
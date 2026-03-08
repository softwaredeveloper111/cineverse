
const errorHandler = (err,req,res,next)=>{
  const response = {
    success:false,
    message:err.message || "Internal server Error",
  }
 
  if(process.env.NODE_ENVIROMENT ==="DEVELOPMENT"){
    response.stack = err.stack
  }

  const status = err.status || 500;
  
  res.status(status).json(response)
  
}


module.exports =  errorHandler 
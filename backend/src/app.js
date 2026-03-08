const express = require("express");
const  errorHandler = require("./middlewares/errorHandler")
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.route")
const movieRouter = require('./routes/movie.route')
const tmdbRouter = require('./routes/tmdb.routes')
const favouriteRouter = require("./routes/favourite.route")
const watchHistoryRouter = require("./routes/watchHistory.route")
const adminRouter = require("./routes/admin.route")


const app = express();




/** application middlewares */
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRouter )
app.use("/api/movies",movieRouter)
app.use("/api/tmdb" , tmdbRouter )
app.use("/api/favourites", favouriteRouter)
app.use("/api/watchhistory", watchHistoryRouter)
app.use("/api/admin",adminRouter)




app.use( errorHandler )



module.exports = app;

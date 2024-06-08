import "dotenv/config.js";

import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index.js";
import redis from "redis";
import mongoose from "mongoose";

// Constants
const port = process.env.PORT || 3000;

// Create http server
const app = express();

// view engine setup
app.set("views", path.join("views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join("public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

async function connectToDatabase() {
  const uri = process.env.MONGOURI;
  const database=process.env.MONGODBNAME;



if (!uri) {
  throw new Error("Missing MONGOURI environment variable");
}

await mongoose.connect(uri+database);
}


const movieSchema = new mongoose.Schema({
title: { type: String, required: true },
year: { type: Number, required: true },
director: { type: String, required: true },
genre: { type: String },
createdAt: { type: Date, default: Date.now },
});

const Movie = mongoose.model("Movie", movieSchema);

let redisClient;

(async () => {
  redisClient = redis.createClient();

redisClient.on("error", (error) => console.error(`Error: ${error}`));

  await redisClient.connect();


})();
const e2c = async () => {

  await connectToDatabase();
  redisClient.set("testKey", "testValue", (err, reply) => {
    if (err) {
      console.error("Error setting key:", err);
    } else {
      console.log("Key set successfully:", reply);
    }
  });
  
//   try {
 
//     const cachedMovies = await getFromCache("movies");
  
//     if (cachedMovies) {
//       console.log("Movies found in cache:");
//       console.log(cachedMovies);
//       return cachedMovies;
//     }

//     const movies = await Movie.find({
//       cast: "Ryan Gosling",
//       rated: "PG-13"
//     }).sort({ released: 1 });


//     await setInCache("movies", movies);

//     console.log("All the movies of Ryan Gosling rated PG-13:");
//     console.log(movies);

//     return movies;
//   } catch (err) {
//     console.log("Error:", err);
//     throw err;
//   }
// };


// const getFromCache = async (key) => {
//   return new Promise((resolve, reject) => {

//     redisClient.get(key, (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(JSON.parse(data));
//         console.log(JSON.parse("hi"+data))
        
//       }
//     });
//   });
// };

// const setInCache = async (key, data) => {
//   return new Promise((resolve, reject) => {
//     redisClient.set(key, JSON.stringify(data), (err, reply) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(reply);
//       }
//     });
//   });
};


e2c();

console.log(redisClient.set)

redisClient.set("testKey", "testValue222", (err, reply) => {
  if (err) {
    console.error("Error setting key:", err);
  } else {
    console.log("Key set successfully:", reply);
  }
});

console.log(1234)

// other express stuff down here....
// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

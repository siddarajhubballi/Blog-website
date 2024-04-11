import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to Mongodb");
  })
  .catch((err) => {
    console.log(`Error while connecting to Mongodb :: ${err}`);
  });

app.listen(4000, () => {
  console.log("Server listening at 4000");
});

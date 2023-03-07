import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./mongodb/connect.js";
import asyncHandler from "express-async-handler";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("Hello World");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(port, () => {
      console.log(`Server has started on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

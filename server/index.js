import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./mongodb/connect.js";
import initRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.URL_CLIENT,
    methods: ["POST", "PUT", "GET", "DELETE"],
  })
);
const port = process.env.PORT || 8080;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRouter(app);

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

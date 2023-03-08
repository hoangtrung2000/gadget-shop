import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./mongodb/connect.js";
import initRouter from "./routes/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

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

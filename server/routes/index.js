import userRouter from "./user.js";
import productRouter from "./product.js";
import { notFound, errorHandler } from "../middlewares/errorHandler.js";

const initRouter = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);

  app.use(notFound);
  app.use(errorHandler);
};

export default initRouter;

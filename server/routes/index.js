import userRouter from "./user.js";
import { notFound, errorHandler } from "../middlewares/errorHandler.js";

const initRouter = (app) => {
  app.use("/api/user", userRouter);

  app.use(notFound);
  app.use(errorHandler);
};

export default initRouter;

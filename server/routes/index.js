import { errorHandler, notFound } from "../middlewares/errorHandler.js";
import blogRouter from "./blog.js";
import blogCategoryRouter from "./blogCategory.js";
import productRouter from "./product.js";
import productCategoryRouter from "./productCategory.js";
import brandRouter from "./brand.js";
import userRouter from "./user.js";
import couponRouter from "./coupon.js";

const initRouter = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/productCategory", productCategoryRouter);
  app.use("/api/blog", blogRouter);
  app.use("/api/brand", brandRouter);
  app.use("/api/blogCategory", blogCategoryRouter);
  app.use("/api/coupon", couponRouter);

  app.use(notFound);
  app.use(errorHandler);
};

export default initRouter;

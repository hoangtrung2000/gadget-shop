import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { getCategories } from "./app/features/asyncActions";
import { useAppDispatch } from "./app/hooks";
import {
  Blogs,
  DetailProduct,
  FAQPage,
  Home,
  Login,
  NotFoundPage,
  Products,
  Public,
  Services,
} from "./pages/public";
import path from "./utils/path";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route
            path={path.DETAIL_PRODUCT__ID__TITLE}
            element={<DetailProduct />}
          />
          <Route path={path.FQA} element={<FAQPage />} />
          <Route path={path.OUR_SERVICES} element={<Services />} />
          <Route path={path.PRODUCTS} element={<Products />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;

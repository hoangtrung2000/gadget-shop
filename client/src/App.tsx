import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { getCategories } from "./app/features/asyncActions";
import { useAppDispatch } from "./app/hooks";
import { Home, Login, NotFoundPage, Public } from "./pages/public";
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
          <Route path={path.LOGIN} element={<Login />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;

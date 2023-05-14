import React from "react";
import { Header, Navigation } from "../../components";

import { Outlet } from "react-router";

const Public: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <Navigation />
      <div className="w-main">
        <Outlet />
      </div>
    </div>
  );
};

export default Public;

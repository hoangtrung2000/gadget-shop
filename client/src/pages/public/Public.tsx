import React from "react";
import { Footer, Header, Navigation, TopHeader } from "../../components";

import { Outlet } from "react-router";

const Public: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <TopHeader />
      <Header />
      <Navigation />
      <div className="w-main">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Public;

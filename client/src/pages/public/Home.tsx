import React from "react";
import { Banner, Sidebar } from "../../components";

const Home: React.FC = () => {
  return (
    <div className="w-main flex">
      <div className="flex flex-col gap-5 w-[25%] flex-auto">
        <Sidebar />
        <span>Deal Daily</span>
      </div>
      <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto">
        <Banner />
        <span>Best Seller</span>
      </div>
    </div>
  );
};

export default Home;

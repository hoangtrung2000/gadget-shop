import React from "react";
import { Sidebar } from "../../components";

const Home: React.FC = () => {
  return (
    <div className="w-main flex">
      <div className="flex flex-col gap-5 w-[30%] flex-auto">
        <Sidebar />
        <span>Deal Daily</span>
      </div>
      <div className="flex flex-col gap-5 pl-5 w-[70%] flex-auto">
        <Sidebar />
        <span>Best Seller</span>
      </div>
    </div>
  );
};

export default Home;

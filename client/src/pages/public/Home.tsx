import React from "react";
import { Banner, BestSeller, Sidebar } from "../../components";

const Home: React.FC = () => {
  return (
    <>
      <div className="flex w-main">
        <div className="flex w-[25%] flex-auto flex-col gap-5">
          <Sidebar />
          <span>Deal Daily</span>
        </div>
        <div className="flex w-[75%] flex-auto flex-col gap-5 pl-5">
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className="h-[500px] w-full"></div>
    </>
  );
};

export default Home;

import React from "react";
import banner from "../assets/banner.jpg";

const Banner: React.FC = () => {
  return (
    <div className="w-full">
      <img
        src={banner}
        alt="banner"
        className="h-[400px] w-full object-cover"
      />
    </div>
  );
};

export default Banner;

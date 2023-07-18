import React, { memo } from "react";
import { Link } from "react-router-dom";
import path from "../utils/path";

const TopHeader: React.FC = memo(() => {
  return (
    <div className="flex h-[38px] w-full items-center justify-center bg-main">
      <div className="flex w-main items-center justify-between text-xs text-white">
        <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
        <Link to={`/${path.LOGIN}`} className="hover:text-black">
          Sign In or Create Account
        </Link>
      </div>
    </div>
  );
});

export default TopHeader;

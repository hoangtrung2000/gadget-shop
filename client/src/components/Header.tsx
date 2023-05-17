import React from "react";
import Logo from "../assets/logo.png";
import icons from "../utils/icons";
import { Link } from "react-router-dom";
import path from "../utils/path";

const Header: React.FC = () => {
  const { RiPhoneFill, GrMail, FaUserAlt, BsFillBagCheckFill } = icons;
  return (
    <div className="w-main flex justify-between h-[110px] py-[35px]">
      <Link to={`/${path.HOME}`}>
        <img src={Logo} alt="logo" className="w-[234px] object-contain" />
      </Link>
      <div className="flex items-center text-sm">
        <div className="flex flex-col items-center px-5 border-r">
          <span className="flex items-center gap-2">
            <RiPhoneFill color="#EE3131" />
            <span className="font-semibold">(+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className="flex flex-col items-center px-5 border-r">
          <span className="flex items-center gap-2">
            <GrMail color="#EE3131" />
            <span className="font-semibold">SUPPORT@TADATHEMES.COM</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        <div className="flex h-full items-center justify-center gap-2 px-5 border-r">
          <BsFillBagCheckFill color="#EE3131" />
          <span>items: 0</span>
        </div>
        <div className="flex justify-center items-center px-5">
          <FaUserAlt color="#EE3131" />
        </div>
      </div>
    </div>
  );
};

export default Header;

import React from "react";
import { navigation } from "../utils/contants";
import { NavLink } from "react-router-dom";
import icons from "../utils/icons";

const Navigation: React.FC = () => {
  const { RiArrowDropDownFill } = icons;
  return (
    <div className="w-main h-12 py-2 border-y mb-6 flex items-center gap-12">
      {navigation.map((nav) => (
        <NavLink
          to={nav.path}
          key={nav.id}
          className={({ isActive }) =>
            `hover:text-main flex items-center  ${isActive ? " text-main" : ""}`
          }
        >
          {nav.value}
          <RiArrowDropDownFill size="30px" />
        </NavLink>
      ))}
    </div>
  );
};

export default Navigation;

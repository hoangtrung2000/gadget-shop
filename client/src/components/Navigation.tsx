import React from "react";
import { navigation } from "../utils/constants";
import { NavLink } from "react-router-dom";
import icons from "../utils/icons";

const Navigation: React.FC = () => {
  const { RiArrowDropDownFill } = icons;
  return (
    <div className="mb-6 flex h-12 w-main items-center gap-12 border-y py-2">
      {navigation.map((nav) => (
        <NavLink
          to={nav.path}
          key={nav.id}
          className={({ isActive }) =>
            `flex items-center hover:text-main  ${isActive ? " text-main" : ""}`
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

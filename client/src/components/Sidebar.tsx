import React from "react";
import { NavLink } from "react-router-dom";
import { selectCategory } from "../app/features/category/categorySlice";
import { useAppSelector } from "../app/hooks";
import { createSlug } from "../utils/helper";
import icons from "../utils/icons";

const Sidebar: React.FC = () => {
  const { TfiMenu } = icons;
  const categories = useAppSelector(selectCategory);

  return (
    <div className="flex flex-col border">
      <div className=" bg-red-500 text-white py-[10px] px-[20px] flex items-center gap-2">
        <TfiMenu />
        <span className="font-semibold flex flex-auto">ALL COLLECTIONS</span>
      </div>
      {categories?.map((cate: Category) => (
        <NavLink
          to={createSlug(cate.title)}
          key={createSlug(cate.title)}
          className="py-[10px] px-[20px] hover:text-main"
        >
          {cate.title}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;

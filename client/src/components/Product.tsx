import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Label } from "../assets";
import { SelectOption } from "../components";
import { formatMoney, renderRatingStar } from "../utils/helper";
import icons from "../utils/icons";
import path from "../utils/path";
type ProductProps = {
  product: Product;
  activeTab?: number;
};

const Product: React.FC<ProductProps> = ({ product, activeTab }) => {
  const [isShowOptions, setIsShowOptions] = useState<boolean>(false);
  const { AiTwotoneHeart, AiOutlineMenu, BsEyeFill } = icons;
  return (
    <div className="w-full px-[10px] text-base">
      <Link
        to={`${path.DETAIL_PRODUCT}/${product._id}/${product.title}`}
        className="flex w-full flex-col items-center gap-[15px] border p-4"
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShowOptions(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShowOptions(false);
        }}
      >
        <div className="relative w-full">
          {isShowOptions && (
            <div className="absolute bottom-[-10px] left-0 right-0 flex animate-slide-top justify-center gap-2">
              <SelectOption icon={<AiTwotoneHeart />} />
              <SelectOption icon={<AiOutlineMenu />} />
              <SelectOption icon={<BsEyeFill />} />
            </div>
          )}
          <img
            src={product?.thumb || ""}
            alt="thumbnail"
            className="h-[274px] w-[274px] object-cover"
          />
          <img
            src={Label}
            alt="label tag"
            className="absolute right-[-43px] top-[-21px] h-9 w-28 object-cover"
          />
          <span className="absolute right-[-2px] top-[-15px] font-bold text-white">
            {activeTab === 1 ? "HOT" : "NEW"}
          </span>
        </div>
        <div className="mt-[15px] flex w-full flex-col items-start gap-1">
          <span className="flex h-4">
            {renderRatingStar(product?.totalRatings)}
          </span>
          <span className="line-clamp-1">{product?.title}</span>
          <span>{`${formatMoney(product?.price)} VND`}</span>
        </div>
      </Link>
    </div>
  );
};

export default Product;

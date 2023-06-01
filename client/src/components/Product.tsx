import React from "react";
import { formatMoney } from "../utils/helper";
import { Label } from "../assets";

type ProductProps = {
  product: Product;
  activeTab: number;
};

const Product: React.FC<ProductProps> = ({ product, activeTab }) => {
  return (
    <div className="w-full px-[10px] text-base">
      <div className="flex w-full flex-col items-center gap-[15px] border p-4">
        <div className="relative w-full">
          <img
            src={product?.thumb || ""}
            alt="thumbnail"
            className="h-[243px] w-[243px] object-cover"
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
        <div className="flex w-full flex-col items-start gap-1">
          <span className="line-clamp-1">{product?.title}</span>
          <span>{`${formatMoney(product?.price)} VND`}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;

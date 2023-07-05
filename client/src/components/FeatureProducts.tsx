import React from "react";
import { useFeatureProducts } from "../hooks";
import { ProductCard } from ".";
import { images } from "../utils/constants";

const FeatureProducts: React.FC = () => {
  const { products } = useFeatureProducts();

  return (
    <div className="w-full">
      <h1 className="border-b-2 border-main py-[15px] text-[20px] font-semibold ">
        FEATURED PRODUCTS
      </h1>
      <div className="mx-[-10px] mt-[15px] flex flex-wrap">
        {products?.map((product: Product) => (
          <ProductCard
            key={product._id}
            thumb={product.thumb}
            title={product.title}
            price={product.price}
            totalRatings={product.totalRatings}
          />
        ))}
      </div>
      <div className="ic flex w-full items-center justify-between">
        <img
          src={images.pic1}
          alt="picture-1"
          className="w-[49%] object-contain"
        />
        <div className="flex w-[24%] flex-col justify-between gap-4 ">
          <img src={images.pic3} alt="picture-3" />
          <img src={images.pic4} alt="picture-4" />
        </div>
        <img
          src={images.pic2}
          alt="picture-2"
          className="w-[24%] object-contain"
        />
      </div>
    </div>
  );
};

export default FeatureProducts;

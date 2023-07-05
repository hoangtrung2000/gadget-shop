import React, { memo } from "react";
import Slider from "react-slick";
import { sliderSettings } from "../utils/constants";
import { Product } from ".";

interface CustomSliderProps {
  categories?: Category[];
  product?: Product[];
  activeTab?: number;
}

const CustomSlider: React.FC<CustomSliderProps> = memo(({ product }) => {
  return (
    <Slider {...sliderSettings}>
      {product?.map((product: Product) => (
        <Product key={product._id} product={product} />
      ))}
    </Slider>
  );
});

export default CustomSlider;

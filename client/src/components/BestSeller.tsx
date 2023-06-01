import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Product, Skeleton } from ".";
import { tabs } from "../assets/constant";
import { useGetProduct } from "../hooks";

const styles = {
  container: `flex gap-8 pb-5 border-main border-b-2`,
  tabStyle: `cursor-pointer capitalize text-lg font-semibold border-r pr-5`,
};

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const BestSeller: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const { bestSeller, newArrival, product, setProduct } = useGetProduct();

  useEffect(() => {
    if (activeTab === 1) setProduct(bestSeller);
    if (activeTab === 2) setProduct(newArrival);
  }, [activeTab]);

  return (
    <>
      <div className={styles.container}>
        {tabs.map((tab) => (
          <span
            className={`${styles.tabStyle} ${
              activeTab === tab.id ? "text-black" : "text-gray-400"
            }`}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </span>
        ))}
      </div>
      <div className="mx-[-10px] mt-4">
        {product ? (
          <Slider {...settings}>
            {product.map((product: Product) => (
              <Product
                key={product._id}
                product={product}
                activeTab={activeTab}
              />
            ))}
          </Slider>
        ) : (
          // Render skeletons while product is fetching
          <div className="mx-[10px] flex gap-4">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BestSeller;

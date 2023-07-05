import React, { useEffect, useState } from "react";
import { CustomSlider, Skeleton } from ".";
import { MiniBanner1, MiniBanner2 } from "../assets";
import { useGetProduct } from "../hooks";
import { tabs } from "../utils/constants";

const styles = {
  container: `flex gap-8 pb-5 border-main border-b-2`,
  tabStyle: `cursor-pointer capitalize text-lg font-semibold border-r pr-5`,
};

const BestSeller: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const { bestSeller, newProducts, product, setProduct } = useGetProduct();

  useEffect(() => {
    if (activeTab === 1) setProduct(bestSeller);
    if (activeTab === 2) setProduct(newProducts);
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
          <CustomSlider product={product} activeTab={activeTab} />
        ) : (
          // Render skeletons while product is fetching
          <div className="mx-[10px] flex gap-4">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        )}
      </div>
      <div className=" flex w-full gap-2 ">
        <img
          src={MiniBanner1}
          alt="mini banner 1"
          className="w-[43px] flex-1 object-contain"
        />
        <img
          src={MiniBanner2}
          alt="mini banner 2"
          className="w-[43px] flex-1 object-contain"
        />
      </div>
    </>
  );
};

export default BestSeller;

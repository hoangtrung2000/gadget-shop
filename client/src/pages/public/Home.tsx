import React from "react";
import { selectCategory } from "../../app/features/category/categorySlice";
import { selectNewProducts } from "../../app/features/product/productSlice";
import { useAppSelector } from "../../app/hooks";
import {
  Banner,
  BestSeller,
  CustomSlider,
  FeatureProducts,
  Sidebar,
} from "../../components";
import icons from "../../utils/icons";

const { IoIosArrowForward } = icons;

const Home: React.FC = () => {
  const newProducts = useAppSelector(selectNewProducts);
  const categories = useAppSelector(selectCategory);
  const brand = categories?.filter((cate) => cate.brand.length > 0);

  return (
    <>
      <div className="flex w-main">
        <div className="flex w-[25%] flex-auto flex-col gap-5">
          <Sidebar />
          {/* <DealDaily /> */}
        </div>
        <div className="flex w-[75%] flex-auto flex-col gap-5 pl-5">
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className="my-8">
        <FeatureProducts />
      </div>
      <div className="my-8 w-full">
        <h3 className="border-b-2 border-main py-[15px] text-[20px] font-semibold ">
          NEW ARRIVAL
        </h3>
        <div className="mx-[-10px] mt-4 ">
          <CustomSlider product={newProducts} />
        </div>
      </div>
      <div className="my-8 w-full">
        <h3 className="border-b-2 border-main py-[15px] text-[20px] font-semibold ">
          HOT COLLECTION
        </h3>
        <div className="mt-4 flex flex-wrap gap-4">
          {brand?.map((category: Category) => (
            <div key={category._id} className="w-[396px]">
              <div className="flex min-h-[200px] gap-4 border p-4">
                <img
                  src={category.image}
                  alt="category image"
                  className="h-[129px] w-[144px] flex-1 object-cover"
                />
                <div className="flex-1 text-gray-700">
                  <h4 className="font-semibold uppercase">{category.title}</h4>
                  <ul className="text-sm">
                    {category.brand.map((item) => (
                      <span className="flex items-center gap-1 text-gray-500">
                        <IoIosArrowForward />
                        <li>{item}</li>
                      </span>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="my-8 w-full">
        <h3 className="border-b-2 border-main py-[15px] text-[20px] font-semibold ">
          BLOG POSTS
        </h3>
      </div>
      <div className="h-[500px] w-full"></div>
    </>
  );
};

export default Home;

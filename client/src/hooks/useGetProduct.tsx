import React, { useEffect, useState } from "react";
import { getProducts } from "../apis/app";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getNewProducts } from "../app/features/asyncActions";
import { selectNewProducts } from "../app/features/product/productSlice";

interface UseGetProductResult {
  bestSeller: Product[] | null;
  newProducts?: Product[];
  product: Product[] | null;
  setProduct: React.Dispatch<React.SetStateAction<Product[] | null>>;
}

const useGetProduct = (): UseGetProductResult => {
  const dispatch = useAppDispatch();
  const newProducts = useAppSelector(selectNewProducts);
  const [product, setProduct] = useState<Product[] | null>(null);
  const [bestSeller, setBestSeller] = useState<Product[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts({ sort: "-sold" });

      if (response?.success) {
        setBestSeller(response.results);
        setProduct(response.results);
      }
    };
    fetchProducts();
    dispatch(getNewProducts());
  }, []);
  return { bestSeller, newProducts, product, setProduct };
};

export default useGetProduct;

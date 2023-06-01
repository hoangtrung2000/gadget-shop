import React, { useEffect, useState } from "react";
import { getProducts } from "../apis/app";

interface UseGetProductResult {
  bestSeller: Product[] | null;
  newArrival: Product[] | null;
  product: Product[] | null;
  setProduct: React.Dispatch<React.SetStateAction<Product[] | null>>;
}

const useGetProduct = (): UseGetProductResult => {
  const [product, setProduct] = useState<Product[] | null>(null);
  const [bestSeller, setBestSeller] = useState<Product[] | null>(null);
  const [newArrival, setNewArrival] = useState<Product[] | null>(null);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await Promise.all([
        getProducts({ sort: "-sold" }),
        getProducts({ sort: "createdAt" }),
      ]);
      if (response[0]?.success) {
        setBestSeller(response[0].results);
        setProduct(response[0].results);
      }
      if (response[1]?.success) setNewArrival(response[1].results);
    };
    fetchProducts();
  }, []);
  return { bestSeller, newArrival, product, setProduct };
};

export default useGetProduct;

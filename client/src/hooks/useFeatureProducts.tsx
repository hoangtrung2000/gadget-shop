import { useEffect, useState } from "react";
import { getProducts } from "../apis/app";

interface FeatureProductsResult {
  products: Product[] | null;
}

const useFeatureProducts = (): FeatureProductsResult => {
  const [products, setProducts] = useState<Product[] | null>(null);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts({
        limit: 9,
        totalRatings: 4,
      });
      if (response.success) setProducts(response.results);
    };
    fetchProducts();
  }, []);

  return { products };
};

export default useFeatureProducts;

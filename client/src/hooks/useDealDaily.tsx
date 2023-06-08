import { useEffect, useState } from "react";
import { getProducts } from "../apis/app";

interface useDealDailyResult {
  dealDaily: Product | null;
}

const useDealDaily = (): useDealDailyResult => {
  const [dealDaily, setDealDaily] = useState<Product | null>(null);
  useEffect(() => {
    const fetchDealDaily = async () => {
      const response = await getProducts({ limit: 1, page: 5 });
      if (response.success) setDealDaily(response.results[0]);
    };
    fetchDealDaily();
  }, []);

  return { dealDaily };
};

export default useDealDaily;

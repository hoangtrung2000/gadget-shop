import { useEffect, useState } from "react";
import { getProducts } from "../apis/app";

interface useDealDailyResult {
  dealDaily: Product | null;
  hours: number;
  minutes: number;
  seconds: number;
}

const useDealDaily = (): useDealDailyResult => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [dealDaily, setDealDaily] = useState<Product | null>(null);
  const [countdownFinished, setCountdownFinished] = useState<boolean>(false);

  const fetchDealDaily = async () => {
    const response = await getProducts({
      limit: 1,
      page: Math.round(Math.random() * 10),
      totalRatings: 5,
    });
    if (response.success) {
      setDealDaily(response.results[0]);
      setHours(1);
      setMinutes(2);
      setSeconds(2);
      setCountdownFinished(false);
    }
  };

  useEffect(() => {
    if (countdownFinished) {
      fetchDealDaily();
    }
  }, [countdownFinished]);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(2);
        } else {
          if (hours > 0) {
            setHours((prevHours) => prevHours - 1);
            setMinutes(2);
            setSeconds(2);
          } else {
            setCountdownFinished(true);
          }
        }
      }
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [hours, minutes, seconds]);

  return { dealDaily, hours, minutes, seconds };
};

export default useDealDaily;

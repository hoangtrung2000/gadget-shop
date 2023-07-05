import moment from "moment";
import { useEffect, useState } from "react";
import { getProducts } from "../apis/app";
import { secondToHms } from "../utils/helper";

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
      page: Math.round(Math.random() * 6),
      totalRatings: 5,
    });
    if (response.success) {
      setDealDaily(response.results[0]);

      // Call API at 5AM
      const today = `${moment().format("MM/DD/YYYY")} 5:00:00`;
      const nextDay = 24 * 3600 * 1000;
      // distance between 5am today and 5am next day:
      // 5AM today + 5AM in next day - the current time (milisecond)
      const distance =
        new Date(today).getTime() - new Date().getTime() + nextDay;

      const time = secondToHms(distance);
      setHours(time.h);
      setMinutes(time.m);
      setSeconds(time.s);
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
          setSeconds(59);
        } else {
          if (hours > 0) {
            setHours((prevHours) => prevHours - 1);
            setMinutes(59);
            setSeconds(59);
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

import React, { memo } from "react";

type CountDownProps = {
  number: number;
  unit: string;
};

const CountDown: React.FC<CountDownProps> = memo(({ number, unit }) => {
  return (
    <div className="flex h-[60px] w-[30%] flex-col items-center justify-center rounded-md bg-[#F4F4F4] ">
      <span className="text-[18px] text-gray-800">{number}</span>
      <span className="text-xs text-gray-700">{unit}</span>
    </div>
  );
});

export default CountDown;

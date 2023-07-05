import React, { memo } from "react";
import { CountDown } from ".";
import { unit } from "../utils/constants";
import { useDealDaily } from "../hooks";
import { formatMoney, renderRatingStar } from "../utils/helper";
import icons from "../utils/icons";

const DealDaily: React.FC = memo(() => {
  const { dealDaily, hours, seconds, minutes } = useDealDaily();

  const { AiFillStar, AiOutlineMenu } = icons;
  return (
    <div className="w-full flex-auto border">
      <div className="flex w-full items-center justify-between p-4">
        <span className="flex flex-1 justify-center">
          <AiFillStar size={20} color="DD1111" />
        </span>
        <span className="flex flex-8 justify-center text-xl font-semibold text-gray-600">
          DEAL DAILY
        </span>
        <span className="flex-1"></span>
      </div>
      <div className="flex w-full flex-col items-center gap-2 px-4 pt-8">
        {dealDaily ? (
          <img
            src={dealDaily?.thumb}
            alt="image"
            className="w-full object-contain"
          />
        ) : (
          "loading..."
        )}
        <span className="line-clamp-1 text-center">{dealDaily?.title}</span>
        <span className="flex h-4">
          {renderRatingStar(dealDaily?.totalRatings, 20)}
        </span>
        <span>
          {dealDaily ? `${formatMoney(dealDaily?.price)} VND` : "0 VND"}
        </span>
      </div>
      <div className="mt-8 p-4">
        <div className="mb-4 flex items-center justify-center gap-2">
          <CountDown unit={unit.HOURS} number={hours} />
          <CountDown unit={unit.MINUTES} number={minutes} />
          <CountDown unit={unit.SECONDS} number={seconds} />
        </div>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 bg-main py-2 font-medium text-white hover:bg-gray-800"
        >
          <AiOutlineMenu />
          <span>Options</span>
        </button>
      </div>
    </div>
  );
});

export default DealDaily;

import React, { memo } from "react";
import icons from "../utils/icons";
import { useDealDaily } from "../hooks";

const DealDaily: React.FC = memo(() => {
  const { dealDaily } = useDealDaily();

  const { AiFillStar } = icons;
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
    </div>
  );
});

export default DealDaily;

import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
};

const SelectOption: React.FC<Props> = ({ icon }) => {
  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-full border
    bg-white shadow-md hover:border-gray-800 hover:bg-gray-800 hover:text-white"
    >
      {icon}
    </div>
  );
};

export default SelectOption;

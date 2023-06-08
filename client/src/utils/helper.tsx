import icons from "./icons";

export const createSlug = (string: string): string =>
  string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");

export const formatMoney = (number: number): string =>
  Number(number.toFixed(1)).toLocaleString();

export const renderRatingStar = (number: string | number) => {
  const { AiFillStar, AiOutlineStar } = icons;
  const stars = [];
  if (!Number(number)) return;
  for (let i = 0; i < +number; i++)
    stars.push(<AiFillStar key={i} color="orange" />);
  for (let i = 5; i > +number; i--)
    stars.push(<AiOutlineStar key={i} color="orange" />);
  return stars;
};

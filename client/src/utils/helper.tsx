import icons from "./icons";

export const createSlug = (string: string): string =>
  string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");

export const formatMoney = (number: number | undefined): string =>
  Number(number?.toFixed(1)).toLocaleString();

export const renderRatingStar = (
  number: string | number | undefined,
  size = 16
) => {
  const { AiFillStar, AiOutlineStar } = icons;
  const stars = [];
  if (!number) return;
  if (!Number(number)) return;
  for (let i = 0; i < +number; i++)
    stars.push(
      <AiFillStar size={size} key={`filled-star-${i}`} color="orange" />
    );
  for (let i = 5; i > +number; i--)
    stars.push(
      <AiOutlineStar size={size} key={`empty-star-${i}`} color="orange" />
    );
  return stars;
};

export const secondToHms = (distance: number) => {
  distance = distance / 1000; // convert d from miliseconds to second
  const h = Math.floor(distance / 3600);
  const m = Math.floor((distance % 3600) / 60);
  const s = Math.floor((distance % 3600) % 60);
  return { h, m, s };
};

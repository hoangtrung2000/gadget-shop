export const createSlug = (string: string): string =>
  string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");

export const formatMoney = (number: number): string =>
  Number(number.toFixed(1)).toLocaleString();

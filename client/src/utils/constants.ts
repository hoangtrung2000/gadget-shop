import path from "./path";

export const navigation: Nav[] = [
  {
    id: 1,
    value: "HOME",
    path: `/${path.HOME}`,
  },
  {
    id: 2,
    value: "PRODUCTS",
    path: `/${path.PRODUCTS}`,
  },
  {
    id: 3,
    value: "BLOGS",
    path: `/${path.BLOGS}`,
  },
  {
    id: 4,
    value: "OUR SERVICES",
    path: `/${path.OUR_SERVICES}`,
  },
  {
    id: 5,
    value: "FQA",
    path: `/${path.FQA}`,
  },
];

export const images = {
  pic1: "https://cdn.shopify.com/s/files/1/1903/4853/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661",
  pic2: "https://cdn.shopify.com/s/files/1/1903/4853/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661",
  pic3: "https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-bottom-home2_400x.jpg?v=1613166661",
  pic4: "https://cdn.shopify.com/s/files/1/1903/4853/files/banner3-bottom-home2_400x.jpg?v=1613166661",
};

export const tabs = [
  { id: 1, name: "best seller" },
  { id: 2, name: "new arrivals" },
];

export const unit = {
  HOURS: "Hours",
  MINUTES: "Minutes",
  SECONDS: "Seconds",
};

export const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

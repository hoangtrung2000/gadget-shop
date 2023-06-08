interface Category {
  id: string;
  title: string;
}

interface Product {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  brand: string;
  price: number;
  category: string;
  quantity: number;
  sold: number;
  images: Array<string>;
  color: string;
  ratings: number;
  totalRatings: number;
  createdAt: string;
  updatedAt: string;
  thumb: string;
}

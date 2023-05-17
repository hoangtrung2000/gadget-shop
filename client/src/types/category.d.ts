interface Category {
  id: string;
  title: string;
}

interface CategoryResponse {
  success: boolean;
  results: Category[];
}

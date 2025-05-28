interface Category {
  id: string;
  name: string;
  detail: string;
  status: "active" | "inactive";
}

interface CategoryPageResponse {
  result: Category[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}
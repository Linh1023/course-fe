interface Course {
  id: string;
  name: string;
  detail: string;
  imageUrl: string;
  videoUrl: string | null;
  price: number;
  category: Category;
  status: "active" | "inactive";
}


interface CoursePageResponse {
  result: Course[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}
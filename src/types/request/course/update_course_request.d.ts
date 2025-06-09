interface UpdateCourseRequest {
  name: string;
  detail: string;
  categoryId: string;
  price: number;
  imageUrl?: string;
  videoUrl?: string;
  status: "active" | "inactive";
}
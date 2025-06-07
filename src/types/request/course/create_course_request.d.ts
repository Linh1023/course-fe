interface CreateCourseRequest {
  name: string;
  detail: string;
  categoryId: string;
  price: number;
  imageUrl: string;
  videoUrl?: string;
}
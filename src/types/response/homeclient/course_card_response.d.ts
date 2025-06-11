interface CourseCardResponse {
  id: string;
  name: string;
  viewedLessons: number;
  totalLessons: number;
  enrolledAt: string;
  status: string;
  imageUrl: string;
  price: number; // Optional nếu có giá
}
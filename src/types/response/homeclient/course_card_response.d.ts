interface CourseCardResponse {
  id: string;
  name: string;
  viewedLessons: number;
  totalLessons: number;
  enrolledAt: string;
  status: string;
  imageUrl: string;
  price: number; // Optional nếu có giá
  totalLessons?: number; // Total number of lessons in the course
  totalDuration?: number; // Total duration of the course in seconds
}
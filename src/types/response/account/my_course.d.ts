export interface Course {
  id: string;
  name: string;
  viewedLessons: number;
  totalLessons: number;
  enrolledAt: string;
  status: "inProgress" | "completed";
  imageUrl: string
}

export interface MyCourseResponse {
  result: Course[];
  totalPages: number;
}

export interface CoursesGridProps {
  courses: Course[];
}

export interface CourseCardProps {
  course: Course;
}
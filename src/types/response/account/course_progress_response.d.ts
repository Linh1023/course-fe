interface CourseProgressResponse {
    id: string;
    name: string;
    viewedLessons: number;
    totalLessons: number;
    enrolledAt: string;
    status: string;
}

interface CourseProgressPageResponse {
  result: CourseProgressResponse[];
  totalPages: number;
}

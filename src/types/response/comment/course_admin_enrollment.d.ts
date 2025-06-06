interface CourseEnrollmentAdmin {
  id: string;
  courseId: string;
  accountId: string;
  courseName: string;
  accountName: string;
  enrolledAt: string;
}
interface CourseEnrollmentResponse {
  result: CourseEnrollmentAdmin[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

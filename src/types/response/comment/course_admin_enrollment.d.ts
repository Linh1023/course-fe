interface CourseEnrollmentAdmin {
  id: string;
  courseId: string;
  accountId: string;
  courseName: string;
  username: string;
  accountName: string;
  enrolledAt: string;
  status: "active" | "inactive" | "pending";
}
interface CourseEnrollmentResponse {
  result: CourseEnrollmentAdmin[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

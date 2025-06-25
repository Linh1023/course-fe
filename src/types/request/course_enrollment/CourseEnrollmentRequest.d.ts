interface CourseEnrollmentRequest {
  courseId: string;
  accountId: string;
  status: "active" | "inactive" | "pending";
}

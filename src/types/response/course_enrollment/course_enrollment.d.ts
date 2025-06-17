interface CourseEnrollment {
  id: number;
  accountId: string;
  courseId: string;
  status: "active" | "pending" | "inactive";
}
interface CourseEnrollment  {
  id: string;   
    courseId: string;
    accountId: string;
    courseName: string;
    accountName: string;
    enrollmentAt: string;
}
interface CourseEnrollmentResponse {
  result: CourseEnrollment[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}
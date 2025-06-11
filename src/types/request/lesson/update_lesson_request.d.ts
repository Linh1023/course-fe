interface UpdateLessonRequest {
  name: string;
  detail: string;
  lessonNumber: number;
  videoUrl: string;
  duration: number;
  documentUrl: string;
  assignmentUrl: string;
  status: "active" | "inactive";
}
interface Lesson {
  id: string;
  name: string;
  detail: string;
  lessonNumber: number;
  videoUrl: string;
  duration: number;
  documentUrl: string;
  assignmentUrl: string;
  chapterId: number;
  status: "active" | "inactive";
}

interface LessonPageResponse {
   result: Lesson[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}
interface Chapter {
  id: number;
  chapterNumber: number;
  name: string;
  detail: string;
  courseId: string;
  status: "active" | "inactive";
}

interface ChapterPageResponse {
  result: Chapter[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}
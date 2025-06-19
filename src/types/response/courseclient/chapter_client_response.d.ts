interface ChapterClientResponse {
   id: number;
   name: string;
   chapterNumber: number;
   lessons: LessonClientResponse[];
}
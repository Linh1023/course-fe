interface CourseClientResponse {
    id: string;
    name: string;
    detail: string;
    imageUrl: string;
    videoUrl: string;
    price: number;
    category: CategoryResponse;
    chapters: ChapterClientResponse[];
    totalLessons: number; // Total number of lessons in the course
    totalDuration: number; // Total duration of the course in seconds
}
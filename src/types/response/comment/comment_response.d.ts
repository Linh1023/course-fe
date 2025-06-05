interface TypeComment  {
  id: string;
  lessonName: string;
  lessonId: string;
  authorName: string;
  authorId: string;
  createdAt: string;
  content: string;
  replyCount: number;
};
interface CommentPageResponse {
  result: TypeComment[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

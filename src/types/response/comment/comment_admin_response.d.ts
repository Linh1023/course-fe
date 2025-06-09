interface CommentAdmin{
  id: string;
  lessonName: string;
  lessonId: string;
  authorName: string;
  authorId: string;
  createdAt: string;
  content: string;
  replyCount: number;
};
interface CommentAdminResponse {
  result: CommentAdmin[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

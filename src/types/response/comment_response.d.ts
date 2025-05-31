type TypeComment = {
  id: string;
  lessonName: string;
  lessonId: string;
  authorName: string;
  authorId: string;
  createdAt: string;
  content: string;
  replyCount: number;
};
type CommentResponse ={
  result: TypeComment[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

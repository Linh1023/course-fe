export type CommentResponse = {
  id: string;
  lessonName: string;
  lessonId: string;
  authorName: string;
  authorId: string;
  status: "unread" | "read"|"active" | "inactive";
  createdAt: string;
  content: string;
  replyCount: number;
};

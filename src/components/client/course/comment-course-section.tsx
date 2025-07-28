"use client";

import {
  FetchServerGetApi,
  FetchServerPostApi,
} from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import { LoaderIcon } from "@/components/share/loading-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentAccountContext } from "@/context/current_account_context";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { CommentCourseItem } from "./comment-course-item";

interface CommentCourseSectionProps {
  commentsResponse: CommentClientResponse;
  courseId: string;
}

const CommentCourseSection = ({
  commentsResponse: initComments,
  courseId,
}: CommentCourseSectionProps) => {
  const [commentList, setComments] = useState<CommentClient[]>(initComments.result ?? []);
  const [lastCreatedAt, setLastCreatedAt] = useState<string |null >(initComments.result[initComments.result.length - 1].createdAt); // Dùng để phân trang theo thời gian
  const [hasMore, setHasMore] = useState(initComments.currentPage < initComments.totalPages - 1); // Xác định có còn trang tiếp theo không
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Loading khi nhấn xem thêm
  const [newCommentContent, setNewCommentContent] = useState(""); // Nội dung comment mới
  const [isSubmitting, setIsSubmitting] = useState(false); // Trạng thái gửi comment
  const { currentAccount }: { currentAccount: CurrentAccountResponse | null } =
    useCurrentAccountContext();

  // Tải bình luận từ server, có thể là thêm (append) hoặc thay thế toàn bộ (init)
  const fetchComments = async (
    beforeCreatedAt: string | null = null,
    append = false
  ) => {
    setIsLoadingMore(true);

    const params = new URLSearchParams({ courseId });
    if (beforeCreatedAt) params.append("createdAt", beforeCreatedAt);

    const data: CommentClientResponse = await FetchServerGetApi(
      `${API.COMMENT.PUBLIC_COMMENT_COURSE}?${params.toString()}`
    );
    const newComments = data.result;

    setComments((prev) => (append ? [...prev, ...newComments] : newComments));
    setLastCreatedAt(
      newComments.length > 0
        ? newComments[newComments.length - 1].createdAt
        : null
    );
    setHasMore(data.currentPage < data.totalPages - 1);
    setIsLoadingMore(false);
  };

  // Gửi bình luận mới
  const handleSubmitNewComment = async () => {
    const content = newCommentContent.trim();
    if (!content) return;

    setIsSubmitting(true);

    const tempId = `temp-${Date.now()}`;
    const optimisticComment: CommentClient = {
      id: tempId,
      content,
      createdAt: "",
      authorName: currentAccount?.name || "Bạn",
      authorAvatar: currentAccount?.avatarUrl || "",
      replyCount: 0,
      authorId: currentAccount?.id || "",
    };

    setComments((prev) => [optimisticComment, ...prev]);
    setNewCommentContent("");

    const res = await FetchServerPostApi(API.COMMENT.COMMENT, {
      courseId,
      content,
    });

    if (res.status === 200 && res.result) {
      const actualComment = res.result as CommentClient;
      setComments((prev) =>
        prev.map((c) => (c.id === tempId ? actualComment : c))
      );
    } else {
      console.error("Gửi bình luận thất bại:", res);
      // Gỡ comment tạm thời (hoặc bạn có thể hiện lỗi)
      setComments((prev) => prev.filter((c) => c.id !== tempId));
    }

    setIsSubmitting(false);
  };

  // Nhấn Enter để gửi, Shift + Enter để xuống dòng
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitNewComment();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Bình luận
      </h2>

      {/* Nút xem thêm bình luận */}
      {hasMore && (
        <div className="flex mt-4">
          <Button
            variant="link"
            className="text-blue-600 hover:underline pl-0"
            onClick={() => fetchComments(lastCreatedAt, true)}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <LoaderIcon className="mr-1.5 size-9 animate-spin" />
            ) : (
              `Xem bình luận cũ hơn`
            )}
          </Button>
        </div>
      )}

      {/* Danh sách bình luận */}
      <div className="space-y-4">
        {isLoadingMore && commentList.length === 0 ? (
          <div className="w-full flex justify-center">
            <LoaderIcon className="mr-1.5 size-9 animate-spin" />
          </div>
        ) : (
          commentList
            ?.slice()
            .reverse()
            .map((comment: CommentClient) => (
              <Card
                key={`comment-card-${comment.id}`}
                className="border-0 shadow-none bg-transparent"
              >
                <CardContent className="p-0">
                  <CommentCourseItem
                    comment={comment}
                    courseId={courseId}
                    currentAccount={currentAccount ?? undefined}
                  />
                </CardContent>
              </Card>
            ))
        )}
      </div>

      {/* Giao diện nhập bình luận mới */}
      {currentAccount && (
        <div className="mt-2 relative bg-white dark:bg-black">
          <Textarea
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
            placeholder="Viết bình luận..."
            className="pr-[45px] min-h-10 h-auto max-h-40 text-sm"
            onKeyDown={handleKeyDown}
          />
          <Button
            size="sm"
            onClick={handleSubmitNewComment}
            className="absolute top-1 right-1 h-8 px-3 text-sm"
            disabled={isSubmitting || !newCommentContent.trim()}
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Gửi"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentCourseSection;

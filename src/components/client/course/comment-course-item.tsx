"use client";

import {
  FetchServerGetApi,
  FetchServerGetApiNoToken,
  FetchServerPostApi,
  FetchServerPutApi,
} from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import { LoaderIcon } from "@/components/share/loading-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatTimeShort } from "@/utils/format_time";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CommentItemProps {
  comment: CommentClient;
  level?: number;
  courseId: string;
  currentAccount?: CurrentAccountResponse;
}

export const CommentCourseItem = ({
  comment,
  level = 0,
  courseId,
  currentAccount,
}: CommentItemProps) => {
  const [mainComment, setMainComment] = useState<CommentClient>(comment);
  const [replies, setReplies] = useState<CommentClient[]>([]);
  const [showReplies, setShowReplies] = useState(false);
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);
  const [hasMore, setHasMore] = useState(comment.replyCount > 0); // Xác định có còn trang tiếp theo không
  const [lastCreatedAt, setLastCreatedAt] = useState<string | null>(null);

  const [showReplyInput, setShowReplyInput] = useState(false);
  const [newReplyContent, setNewReplyContent] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [isDeletingComment, setIsDeletingComment] = useState(false);
  const replyTextAreaRef = useRef<HTMLTextAreaElement>(null);

  // Tự động focus vào textarea khi hiển thị form trả lời
  useEffect(() => {
    if (showReplyInput && replyTextAreaRef.current) {
      replyTextAreaRef.current.focus();
    }
  }, [showReplyInput]);

  // Gọi API để lấy danh sách phản hồi của 1 bình luận
  const fetchReplies = async (
    beforeCreatedAt: string | null = null,
    append = false
  ) => {
    setIsLoadingReplies(true);

    const params = new URLSearchParams({ commentId: comment.id });
    if (beforeCreatedAt) params.append("createdAt", beforeCreatedAt);

    const data: CommentClientResponse = await FetchServerGetApiNoToken(
      `${API.COMMENT.PUBLIC_COMMENT_COURSE_REPLY}?${params.toString()}`
    );
    const newComments = data.result;

    setLastCreatedAt(
      newComments.length > 0
        ? newComments[newComments.length - 1].createdAt
        : null
    );
    setReplies((prev) => (append ? [...prev, ...data.result] : data.result));
    setHasMore(data.currentPage < data.totalPages - 1);
    setShowReplies(true);
    setIsLoadingReplies(false);
  };

  // Bật/tắt hiển thị phản hồi
  const handleViewReplies = () => {
    if (showReplies) {
      setShowReplies(false);
    } else if (!replies.length && mainComment.replyCount > 0) {
      fetchReplies(lastCreatedAt, false);
    } else {
      setShowReplies(true);
    }
  };

  const handleSubmitNewReply = async () => {
    const content = newReplyContent.trim();
    if (!content) return;

    setIsSubmittingReply(true);

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
    setMainComment((prev) => ({
      ...prev,
      replyCount: prev.replyCount + 1,
    }));

    setReplies((prev) => [optimisticComment, ...prev]);
    setNewReplyContent("");
    setShowReplies(true);

    const res = await FetchServerPostApi(API.COMMENT.COMMENT, {
      courseId,
      commentParentId: mainComment.id, // Gán ID của bình luận cha
      content,
    });

    if (res.status === 200 && res.result) {
      const actualComment = res.result as CommentClient;
      setReplies((prev) =>
        prev.map((c) => (c.id === tempId ? actualComment : c))
      );
    } else {
      console.error("Gửi bình luận thất bại:", res);
      // Gỡ comment tạm thời (hoặc bạn có thể hiện lỗi)
      setReplies((prev) => prev.filter((c) => c.id !== tempId));
    }

    setIsSubmittingReply(false);
  };

  // Gửi bình luận bằng Enter, Shift+Enter để xuống dòng
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitNewReply();
    }
  };

  // Gọi API để đánh dấu bình luận là đã xóa (status = inactive)
  const handleDeleteComment = async (commentId: string) => {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa bình luận này?"
    );
    if (!confirmed) return;

    setIsDeletingComment(true);
    const res = await FetchServerPutApi(API.COMMENT.ADMIN_DELETE_COMMENT, {
      commentId,
      status: "inactive",
    });

    if (res.status === 200) {
      // Chỉ thay đổi nội dung hiển thị thay vì xóa khỏi DOM
      setMainComment((prev) => ({
        ...prev,
        content: "Bình luận đã bị xóa",
        id: "",
      }));
    } else {
      console.error("Failed to delete comment:", res);
    }

    setIsDeletingComment(false);
  };

  return (
    <div className={level > 0 ? `ml-2 pt-2` : ""}>
      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        {/* comment chính */}
        <div className="flex items-start gap-4">
          <Avatar className={`w-${level > 0 ? 8 : 10} h-${level > 0 ? 8 : 10}`}>
            <AvatarImage src={mainComment.authorAvatar} />
            <AvatarFallback>{mainComment.authorName[0]}</AvatarFallback>
          </Avatar>
          <div className="">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                {mainComment.authorName}
              </div>
            </div>

            <p
              className={`mt-1 text-${
                level > 0 ? "sm" : "base"
              } text-gray-700 dark:text-gray-200`}
            >
              {mainComment.content}
            </p>

            <div className="flex items-center gap-2">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {mainComment.createdAt == "" ? (
                  <LoaderIcon className="mr-1.5 size-4   animate-spin" />
                ) : (
                  formatTimeShort(mainComment.createdAt)
                )}
              </div>

              {currentAccount && mainComment.createdAt != "" && (
                <>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-blue-600 hover:underline"
                    onClick={() => setShowReplyInput(true)}
                    disabled={showReplyInput}
                  >
                    Trả lời
                  </Button>

                  {(currentAccount.role === "ADMIN" ||
                    (currentAccount.role === "CLIENT" &&
                      currentAccount.id === mainComment.authorId)) && (
                    <Button
                      variant="link"
                      size="sm"
                      className="text-red-500 hover:underline"
                      onClick={() => handleDeleteComment(mainComment.id)}
                      disabled={isDeletingComment}
                    >
                      {isDeletingComment ? (
                        <LoaderIcon className="mr-1.5 size-9 animate-spin" />
                      ) : (
                        "Xóa"
                      )}
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {(mainComment.replyCount > 0 || showReplyInput) && (
        <div className="ml-2 border-l-2 border-gray-300 dark:border-gray-700 rounded-bl-md pt-2">
          {/* Nút xem phản hồi */}
          {!showReplies && mainComment.replyCount > 0 && (
            <Button
              variant="link"
              size="sm"
              className="text-blue-600 hover:underline"
              onClick={() => fetchReplies(lastCreatedAt, true)}
              disabled={isLoadingReplies}
            >
              {isLoadingReplies ? (
                <LoaderIcon className="mr-1.5 size-9 animate-spin" />
              ) : (
                `Xem tất cả ${mainComment.replyCount} phản hồi`
              )}
            </Button>
          )}

          {/* Nút tải thêm phản hồi nếu còn */}
          {hasMore && showReplies && (
            <Button
              variant="link"
              size="sm"
              className="text-blue-600 hover:underline ml-4"
              onClick={() => fetchReplies(lastCreatedAt, true)}
              disabled={isLoadingReplies}
            >
              {isLoadingReplies ? (
                <LoaderIcon className="mr-1.5 size-9 animate-spin" />
              ) : (
                `Xem phản hồi cũ hơn`
              )}
            </Button>
          )}

          {/* Hiển thị danh sách phản hồi */}
          {showReplies && (
            <>
              {isLoadingReplies && replies.length === 0 ? (
                <div className="w-full flex justify-center">
                  <LoaderIcon className="mr-1.5 size-9 animate-spin" />
                </div>
              ) : (
                replies
                  .slice()
                  .reverse()
                  .map((reply) => (
                    <CommentCourseItem
                      key={reply.id + reply.authorId}
                      comment={reply}
                      level={level + 1}
                      courseId={courseId}
                      currentAccount={currentAccount}
                    />
                  ))
              )}
            </>
          )}

          {/* Giao diện nhập phản hồi mới */}
          {showReplyInput && (
            <div className="mx-2 mb-2 relative bg-white dark:bg-black mt-2">
              <Textarea
                value={newReplyContent}
                onChange={(e) => setNewReplyContent(e.target.value)}
                placeholder="Viết phản hồi..."
                className="pr-[45px] min-h-10 h-auto max-h-40 text-sm"
                ref={replyTextAreaRef}
                onKeyDown={handleKeyDown}
              />
              <Button
                size="sm"
                onClick={handleSubmitNewReply}
                className="absolute right-1 h-8 px-3 text-sm top-1"
                disabled={isSubmittingReply || !newReplyContent.trim()}
              >
                {isSubmittingReply ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Gửi"
                )}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

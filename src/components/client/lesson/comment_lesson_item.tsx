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
  lessonId: string;
  currentAccount?: CurrentAccountResponse;
}
// đại diện cho 1 comment trong danh sách
export const CommentLessonItem = ({
  comment,
  level = 0,
  lessonId,
  currentAccount,
}: CommentItemProps) => {
  // lưu các comment con của nó
  const [replies, setReplies] = useState<CommentClient[]>([]);
  const [showReplies, setShowReplies] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [replyPage, setReplyPage] = useState(0);
  const [replyTotalItems, setReplyTotalItems] = useState(0);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isShowAction, setIsShowAction] = useState<boolean>(true);
  const replyTextAreaRef = useRef<HTMLTextAreaElement>(null);

  // Khi showReplyInput bật lên, focus vào input
  useEffect(() => {
    if (showReplyInput && replyTextAreaRef.current) {
      replyTextAreaRef.current.focus();
    }
  }, [showReplyInput]);

  // hàm lấy những comment trả lời cho cmt hiện tại
  const fetchReplies = async (page: number, append = false) => {
    setLoadingReplies(true);
    const data: CommentClientResponse = await FetchServerGetApi(
      `${API.COMMENT.COMMENT_LESSON_REPLY}?commentId=${comment.id}&page=${page}`
    );
    setReplies((prev) => (append ? [...prev, ...data.result] : data?.result));
    setReplyTotalItems(data.totalItems || 1);
    setShowReplies(true);
    setLoadingReplies(false);
  };

  // xử lý nút trả lời
  const handleViewReply = () => {
    // mở rồi thì đóng lại
    if (showReplies) {
      setShowReplies(false);
    } else {
      if (!replies?.length && comment.replyCount > 0) {
        fetchReplies(0, false);
      } else {
        setShowReplies(true);
      }
    }
  };

  // xử lý gửi comment mới
  const handleSubmitReply = async () => {
    if (!replyContent.trim()) return;
    setSubmitting(true);
    const res = await FetchServerPostApi(API.COMMENT.COMMENT, {
      lessonId,
      commentParentId: comment.id,
      content: replyContent,
    });
    if (res.status == 200) {
      setReplyContent("");
      await fetchReplies(0, false);
      // setReplies((prev) => [...prev, res.result]);
      // comment.replyCount++;
      // if (!showReplies && comment.replyCount > 0) {
      //   fetchReplies(0, false);
      // }
    } else {
      console.error("Failed to submit reply:");
    }
    setSubmitting(false);
  };

  // dùng nút enter để gửi
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmitReply();
    }
  };

  //xóa comment
  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bình luận này?")) return;
    const res = await FetchServerPutApi(API.COMMENT.ADMIN_DELETE_COMMENT, {
      commentId: commentId,
      status: "inactive",
    });

    if (res.status === 200) {
      // Nếu comment hiện tại là comment cha (comment.id == commentId), có thể ẩn nó hoặc để component cha xử lý
      if (comment.id === commentId) {
        // Ví dụ: ẩn nội dung comment này (soft delete UI)
        comment.content = "[Bình luận đã bị xóa]";
        comment.replyCount = 0;
        setReplies([]); // ẩn replies
        setIsShowAction(false);
      } else {
        // Nếu là reply nằm trong replies của mình → xoá trong replies của mình
        setReplies((prev) => prev.filter((r) => r.id !== commentId));
      }
    } else {
      alert("Xóa bình luận thất bại!");
    }
  };

  return (
    <div className={level > 0 ? `ml-2 pt-2` : ""}>
      {/* Nội dung chính comment */}
      <div className="p-2  bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4  ">
          <Avatar className={`w-${level > 0 ? 8 : 10} h-${level > 0 ? 8 : 10}`}>
            <AvatarImage src={comment.authorAvatar} />
            <AvatarFallback>{comment.authorName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                {comment.authorName + "   " + comment.id}
              </div>
            </div>
            <p
              className={`mt-1 text-${
                level > 0 ? "sm" : "base"
              } text-gray-700 dark:text-gray-200`}
            >
              {comment.content}
            </p>

            {/* Nếu comment bị xóa các actiion bị ẩn đi */}
            {isShowAction && (
              <div className="flex items-center gap-2">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {formatTimeShort(comment.createdAt)}
                </div>

                <Button
                  variant="link"
                  size="sm"
                  className="text-blue-600 hover:underline"
                  onClick={() => setShowReplyInput(!showReplyInput)}
                >
                  Trả lời
                </Button>
                {(currentAccount?.role == "ADMIN" ||
                  (currentAccount?.role == "CLIENT" &&
                    currentAccount?.id == comment.authorId)) && (
                  <Button
                    variant="link"
                    size="sm"
                    className="text-red-500 hover:underline"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Xóa
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* các thành phần comment con Gồm */}
      {comment?.replyCount > 0 || showReplyInput ? (
        <div className="ml-2 border-l-2 border-gray-300 dark:border-gray-700 rounded-bl-md pt-2">
          {/* hiện phản hồi : hiện 10 phải hồi đầu tiên */}
          {!showReplies && comment.replyCount > 0 && (
            <Button
              variant="link"
              size="sm"
              className="text-blue-600 hover:underline"
              onClick={handleViewReply}
              disabled={loadingReplies}
            >
              {loadingReplies ? ( 
                <div className="w-full flex justify-center">
                  <LoaderIcon
                    className="mr-1.5 size-9 animate-spin"
                    aria-hidden="true"
                  ></LoaderIcon>
                </div>
              ) : (
                `Xem tất cả ${comment.replyCount} phản hồi`
              )}
            </Button>
          )}

          {/* xem thêm phản hồi cũ */}
          {(replyPage + 1) * 10 < replyTotalItems && (
            <Button
              variant="link"
              size="sm"
              className="text-blue-600 hover:underline ml-4"
              onClick={async () => {
                await fetchReplies(replyPage + 1, true);
                setReplyPage((prev) => prev + 1);
              }}
              disabled={loadingReplies}
            >
              {loadingReplies ? (
                <div className="w-full flex justify-center">
                  <LoaderIcon
                    className="mr-1.5 size-9 animate-spin"
                    aria-hidden="true"
                  ></LoaderIcon>
                </div>
              ) : (
                `Xem ${replyTotalItems - (replyPage + 1) * 10} phản hồi cũ hơn`
              )}
            </Button>
          )}

          {/* danh sách comment con */}
          {showReplies && replies?.length <= 0 ? (
            <div className="w-full flex justify-center">
              <LoaderIcon
                className="mr-1.5 size-9 animate-spin"
                aria-hidden="true"
              ></LoaderIcon>
            </div>
          ) : (
            <>
              {replies
                ?.slice() // Create a shallow copy to avoid mutating the original array
                .reverse()
                .map((reply: CommentClient) => (
                  <CommentLessonItem
                    key={reply.id}
                    comment={reply}
                    level={level + 1}
                    lessonId={lessonId}
                    currentAccount={currentAccount}
                  />
                ))}
            </>
          )}

          {/* textarea trả lời */}
          {showReplyInput && (
            <div className="mx-2 mb-2 relative bg-white dark:bg-black mt-2">
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Viết phản hồi..."
                className="pr-[45px] min-h-10 h-auto max-h-40 text-sm "
                ref={replyTextAreaRef}
                onKeyDown={handleKeyDown}
              />
              <Button
                size="sm"
                onClick={handleSubmitReply}
                className="absolute 1 right-1 h-8 px-3 text-sm"
                disabled={submitting || !replyContent.trim()}
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Gửi"
                )}
              </Button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

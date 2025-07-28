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

/**
 * @interface CommentItemProps
 * @property {CommentClient} comment - Dữ liệu của bình luận chính.
 * @property {number} [level=0] - Cấp độ lồng ghép của bình luận (0 cho bình luận gốc, 1 cho phản hồi, v.v.).
 * @property {string} lessonId - ID của bài học mà bình luận thuộc về.
 * @property {CurrentAccountResponse} [currentAccount] - Thông tin tài khoản người dùng hiện tại, nếu có.
 * @property {() => void} onDelete - Hàm callback được gọi khi một bình luận con bị xóa để làm mới danh sách.
 */
interface CommentItemProps {
  comment: CommentClient;
  level?: number;
  lessonId: string;
  currentAccount?: CurrentAccountResponse;
  onDelete: () => void;
}

/**
 * @component CommentLessonItem
 * @description Đại diện cho một bình luận chính hoặc một phản hồi trong danh sách bình luận.
 * @param {CommentItemProps} props - Các props của component.
 * @returns {JSX.Element} Component hiển thị bình luận.
 */
export const CommentLessonItem = ({
  comment: mainComment, // Đổi tên thành mainComment để rõ ràng hơn
  level = 0,
  lessonId,
  currentAccount,
  onDelete,
}: CommentItemProps) => {
  // Lưu trữ các phản hồi (reply comments) của bình luận hiện tại
  const [replies, setReplies] = useState<CommentClient[]>([]);
  // Trạng thái hiển thị các phản hồi
  const [showReplies, setShowReplies] = useState(false);
  // Trạng thái đang tải các phản hồi
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);
  // Trang hiện tại của danh sách phản hồi
  const [replyCurrentPage, setReplyCurrentPage] = useState(0);
  // Tổng số lượng phản hồi
  const [replyTotalItems, setReplyTotalItems] = useState(0);
  // Trạng thái hiển thị ô nhập phản hồi
  const [showReplyInput, setShowReplyInput] = useState(false);
  // Nội dung của phản hồi mới
  const [newReplyContent, setNewReplyContent] = useState("");
  // Trạng thái đang gửi phản hồi
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  // Trạng thái đang xóa bình luận
  const [isDeletingComment, setIsDeletingComment] = useState(false);
  // Ref cho ô nhập phản hồi để tự động focus
  const replyTextAreaRef = useRef<HTMLTextAreaElement>(null);

  // Khi ô nhập phản hồi hiển thị, tự động focus vào đó
  useEffect(() => {
    if (showReplyInput && replyTextAreaRef.current) {
      replyTextAreaRef.current.focus();
    }
  }, [showReplyInput]);

  /**
   * @function fetchReplies
   * @description Lấy các bình luận trả lời cho bình luận chính hiện tại.
   * @param {number} page - Số trang cần lấy.
   * @param {string} commentId - ID của bình luận cha.
   * @param {boolean} [append=false] - Có nối thêm vào danh sách hiện có hay không.
   */
  const fetchReplies = async (
    page: number,
    commentId: string,
    append = false
  ) => {
    setIsLoadingReplies(true);
    const data: CommentClientResponse = await FetchServerGetApi(
      `${API.COMMENT.COMMENT_LESSON_REPLY}?commentId=${commentId}&page=${page}`
    );
    setReplies((prev) =>
      append ? [...prev, ...data.result] : data?.result
    );
    setReplyCurrentPage(data.currentPage + 1);
    setReplyTotalItems(data.totalItems || 1); // Đảm bảo không phải 0 nếu có phản hồi
    setShowReplies(true); // Luôn hiển thị phản hồi sau khi tải
    setIsLoadingReplies(false);
  };

  /**
   * @function handleViewReplies
   * @description Xử lý khi người dùng nhấp vào nút "Xem phản hồi".
   * Nếu đã mở thì đóng lại, nếu chưa mở và có phản hồi thì tải và mở.
   */
  const handleViewReplies = () => {
    // Nếu các phản hồi đang hiển thị, đóng chúng lại
    if (showReplies) {
      setShowReplies(false);
    } else {
      // Nếu chưa có phản hồi nào được tải và có số lượng phản hồi > 0, thì tải chúng
      if (!replies?.length && mainComment.replyCount > 0) {
        fetchReplies(0, mainComment.id, false);
      } else {
        // Nếu đã có phản hồi hoặc không có phản hồi nhưng muốn hiển thị
        setShowReplies(true);
      }
    }
  };

  /**
   * @function handleOnDeleteReply
   * @description Callback để tải lại danh sách phản hồi khi một phản hồi con bị xóa.
   */
  const handleOnDeleteReply = () => {
    fetchReplies(0, mainComment.id);
  };

  /**
   * @function handleSubmitReply
   * @description Xử lý gửi phản hồi mới.
   */
  const handleSubmitReply = async () => {
    if (!newReplyContent.trim()) return; // Không gửi nếu nội dung trống
    setIsSubmittingReply(true);
    const res = await FetchServerPostApi(API.COMMENT.COMMENT, {
      lessonId,
      commentParentId: mainComment.id, // Gán ID của bình luận cha
      content: newReplyContent,
    });
    if (res.status === 200) {
      await fetchReplies(0, mainComment.id, false); // Tải lại danh sách phản hồi sau khi gửi
      setNewReplyContent(""); // Xóa nội dung ô nhập
    } else {
      console.error("Failed to submit reply:", res); // Ghi lỗi nếu gửi thất bại
    }
    setIsSubmittingReply(false);
  };

  /**
   * @function handleKeyDown
   * @description Xử lý sự kiện nhấn phím, gửi phản hồi khi nhấn Enter.
   * @param {React.KeyboardEvent<HTMLTextAreaElement>} e - Sự kiện bàn phím.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { // Gửi khi nhấn Enter, bỏ qua nếu nhấn Shift+Enter
      e.preventDefault();
      handleSubmitReply();
    }
  };

  /**
   * @function handleDeleteComment
   * @description Xóa một bình luận (bao gồm cả bình luận chính và phản hồi).
   * @param {string} commentId - ID của bình luận cần xóa.
   */
  const handleDeleteComment = async (commentId: string) => {
    // Sử dụng modal tùy chỉnh thay vì window.confirm
    const confirmed = await new Promise((resolve) => {
      // Logic hiển thị modal xác nhận ở đây
      const userConfirmed = window.confirm("Bạn có chắc chắn muốn xóa bình luận này?");
      resolve(userConfirmed);
    });

    if (!confirmed) return;

    setIsDeletingComment(true);
    const res = await FetchServerPutApi(API.COMMENT.ADMIN_DELETE_COMMENT, {
      commentId: commentId,
      status: "inactive", // Cập nhật trạng thái thành "inactive" (xóa mềm)
    });

    if (res.status === 200) {
      // Nếu bình luận chính bị xóa, thông báo cho component cha để làm mới danh sách
      if (commentId === mainComment.id) {
        onDelete();
      } else {
        // Nếu là một phản hồi, tải lại danh sách phản hồi của bình luận chính
        fetchReplies(0, mainComment.id);
      }
    } else {
      console.error("Xóa bình luận thất bại:", res); // Ghi lỗi nếu xóa thất bại
      // Hiển thị thông báo lỗi tùy chỉnh thay vì alert
      // Ví dụ: setErrorMessage("Xóa bình luận thất bại!");
    }
    setIsDeletingComment(false);
  };

  return (
    <div className={level > 0 ? `ml-2 pt-2` : ""}>
      {/* Nội dung chính của bình luận */}
      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4">
          <Avatar className={`w-${level > 0 ? 8 : 10} h-${level > 0 ? 8 : 10}`}>
            <AvatarImage src={mainComment.authorAvatar} />
            <AvatarFallback>{mainComment.authorName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
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
                {formatTimeShort(mainComment.createdAt)}
              </div>

              {/* Nút trả lời */}
              <Button
                variant="link"
                size="sm"
                className="text-blue-600 hover:underline"
                onClick={() => setShowReplyInput(true)}
                disabled={showReplyInput}
              >
                Trả lời
              </Button>
              {/* Nút xóa (chỉ hiển thị cho admin hoặc tác giả bình luận) */}
              {(currentAccount?.role === "ADMIN" ||
                (currentAccount?.role === "CLIENT" &&
                  currentAccount?.id === mainComment.authorId)) && (
                <Button
                  variant="link"
                  size="sm"
                  className="text-red-500 hover:underline"
                  onClick={() => handleDeleteComment(mainComment.id)}
                  disabled={isDeletingComment}
                >
                  {isDeletingComment ? (
                    <div className="w-full flex justify-center">
                      <LoaderIcon
                        className="mr-1.5 size-9 animate-spin"
                        aria-hidden="true"
                      ></LoaderIcon>
                    </div>
                  ) : (
                    `Xóa`
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Các thành phần bình luận con (phản hồi) */}
      {mainComment?.replyCount > 0 || showReplyInput ? (
        <div className="ml-2 border-l-2 border-gray-300 dark:border-gray-700 rounded-bl-md pt-2">
          {/* Nút hiển thị/ẩn phản hồi */}
          {!showReplies && mainComment.replyCount > 0 && (
            <Button
              variant="link"
              size="sm"
              className="text-blue-600 hover:underline"
              onClick={handleViewReplies}
              disabled={isLoadingReplies}
            >
              {isLoadingReplies ? (
                <div className="w-full flex justify-center">
                  <LoaderIcon
                    className="mr-1.5 size-9 animate-spin"
                    aria-hidden="true"
                  ></LoaderIcon>
                </div>
              ) : (
                `Xem tất cả ${mainComment.replyCount} phản hồi`
              )}
            </Button>
          )}

          {/* Nút xem thêm phản hồi cũ */}
          {(replyCurrentPage) * 10 < replyTotalItems && (
            <Button
              variant="link"
              size="sm"
              className="text-blue-600 hover:underline ml-4"
              onClick={async () => {
                await fetchReplies(replyCurrentPage + 1, mainComment.id, true);
              }}
              disabled={isLoadingReplies}
            >
              {isLoadingReplies ? (
                <div className="w-full flex justify-center">
                  <LoaderIcon
                    className="mr-1.5 size-9 animate-spin"
                    aria-hidden="true"
                  ></LoaderIcon>
                </div>
              ) : (
                `Xem ${replyTotalItems - (replyCurrentPage) * 10} phản hồi cũ hơn`
              )}
            </Button>
          )}

          {/* Danh sách các bình luận con (phản hồi) */}
          {showReplies && replies?.length === 0 && isLoadingReplies ? (
            <div className="w-full flex justify-center">
              <LoaderIcon
                className="mr-1.5 size-9 animate-spin"
                aria-hidden="true"
              ></LoaderIcon>
            </div>
          ) : (
            <>
              {showReplies && replies
                ?.slice() // Tạo một bản sao nông để tránh làm thay đổi mảng gốc
                .reverse() // Hiển thị các phản hồi mới nhất trước
                .map((reply: CommentClient) => (
                  <CommentLessonItem
                    key={reply.id}
                    comment={reply}
                    level={level + 1} // Tăng cấp độ lồng ghép
                    lessonId={lessonId}
                    currentAccount={currentAccount}
                    onDelete={handleOnDeleteReply} // Truyền callback để làm mới danh sách phản hồi con
                  />
                ))}
            </>
          )}

          {/* Ô nhập liệu để trả lời bình luận */}
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
                onClick={handleSubmitReply}
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
      ) : null}
    </div>
  );
};

"use client";

import {
  FetchServerGetApiNoToken,
  FetchServerPostApi,
} from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatTimeShort } from "@/utils/format_time";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CommentClient {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  replyCount: number;
}

interface CommentItemProps {
  comment: CommentClient;
  level?: number;
  lessonId: string;
  onCommentAdded: () => void;
}

export const CommentItem = ({
  comment,
  level = 0,
  lessonId,
  onCommentAdded,
}: CommentItemProps) => {
  const [replies, setReplies] = useState<CommentClient[]>([]);
  const [showReplies, setShowReplies] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [replyPageIndex, setReplyPageIndex] = useState(0);
  const [replyTotalPages, setReplyTotalPages] = useState(1);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const replyTextAreaRef = useRef<HTMLTextAreaElement>(null);

  // Khi showReplyInput bật lên, focus vào input
  useEffect(() => {
    if (showReplyInput && replyTextAreaRef.current) {
      replyTextAreaRef.current.focus();
    }
  }, [showReplyInput]);

  const fetchReplies = async (page: number, append = false) => {
    setLoadingReplies(true);
    const data = await FetchServerGetApiNoToken(
      `${API.COMMENT.PUBLIC_COMMENT_REPLY}?commentId=${comment.id}&pageIndex=${page}`
    );
    setReplies((prev) => (append ? [...prev, ...data.result] : data.result));
    setReplyTotalPages(data.totalPages || 1);
    setShowReplies(true);
    setLoadingReplies(false);
  };

  const toggleReplies = () => {
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

  const loadMoreReplies = () => {
    fetchReplies(replyPageIndex + 1, true);
    setReplyPageIndex((prev) => prev + 1);
  };

  const handleSubmitReply = async () => {
    if (!replyContent.trim()) return;
    setSubmitting(true);
    const res: CommentClientResponse = await FetchServerPostApi(
      API.COMMENT.COMMENT,
      {
        lessonId,
        commentParentId: comment.id,
        content: replyContent,
      }
    );
    if (res.status == 200) {
      setReplyContent("");
      setShowReplyInput(false);
      onCommentAdded();
      if (!showReplies && comment.replyCount > 0) {
        fetchReplies(0, false);
      }
    }
    console.error("Failed to submit reply:");
    setSubmitting(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // optional: chặn xuống dòng (nếu dùng textarea thì mới cần)
      handleSubmitReply();
    }
  };

  return (
    <div className={level > 0 ? `ml-2 pt-2` : ""}>
      <div className="p-2  bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4  ">
          <Avatar className={`w-${level > 0 ? 8 : 10} h-${level > 0 ? 8 : 10}`}>
            <AvatarImage src={comment.authorAvatar} />
            <AvatarFallback>{comment.authorName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                {comment.authorName}
              </div>
            </div>
            <p
              className={`mt-1 text-${
                level > 0 ? "sm" : "base"
              } text-gray-700 dark:text-gray-200`}
            >
              {comment.content}
            </p>
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
            </div>
          </div>
        </div>
      </div>

      {showReplyInput && (
        <div className="mt-2 relative bg-white dark:bg-black">
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
            className="absolute top-1 right-1 h-8 px-3 text-sm"
            disabled={submitting || !replyContent.trim()}
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Gửi"}
          </Button>
        </div>
      )}
      {comment.replyCount > 0 && !showReplies && (
        <Button
          variant="link"
          size="sm"
          className="text-blue-600 hover:underline"
          onClick={toggleReplies}
          disabled={loadingReplies}
        >
          {loadingReplies ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            `Xem ${comment.replyCount} phản hồi`
          )}
        </Button>
      )}
      {showReplies && replies?.length > 0 && (
        <div className="space-y-3 ml-2 border-l-2 border-gray-200 dark:border-gray-700">
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              level={level + 1}
              lessonId={lessonId}
              onCommentAdded={onCommentAdded}
            />
          ))}
          {replyPageIndex + 1 < replyTotalPages && (
            <Button
              variant="link"
              size="sm"
              className="text-blue-600 hover:underline ml-4"
              onClick={loadMoreReplies}
              disabled={loadingReplies}
            >
              {loadingReplies ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                "Xem thêm phản hồi"
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

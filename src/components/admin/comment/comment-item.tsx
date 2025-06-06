"use client";

import { FetchServerGetApiNoToken } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatTimeShort } from "@/utils/format_time";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface CommentItemProps {
  comment: CommentClient;
  level?: number;
}

export const CommentItem = ({ comment, level = 0 }: CommentItemProps) => {
  const [replies, setReplies] = useState<CommentClient[]>([]);
  const [showReplies, setShowReplies] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [replyPageIndex, setReplyPageIndex] = useState(0);
  const [replyTotalPages, setReplyTotalPages] = useState(1);

  const fetchReplies = async (page: number, append = false) => {
    setLoadingReplies(true);
    const data = await FetchServerGetApiNoToken(
      `${API.COMMENT.PUBLIC_COMMENT_REPLY}/${comment.id}?pageIndex=${page}`
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
      if (!replies.length && comment.replyCount > 0) {
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

  return (
    <div
      className={`${
        level > 0 && level < 5 ? `ml-2 pl-2 border-l-2` : ""
      }`}
    >
      <div className="flex items-start gap-3 p-2 bg-[#F0F2F5] dark:bg-[#333334] rounded-lg shadow-sm">
        <Avatar className={`w-${level > 0 ? 6 : 8} h-${level > 0 ? 6 : 8}`}>
          <AvatarImage src={comment.authorAvatar} />
          <AvatarFallback>{comment.authorName[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="font-medium">{comment.authorName}</div>
            <div className="text-xs text-muted-foreground">
              {formatTimeShort(comment.createdAt)}
            </div>
          </div>
          <p className={`mt-1 text-${level > 0 ? "sm" : "base"}`}>{comment.content}</p>

          {comment.replyCount > 0 && (
            <Button
              variant="link"
              size="sm"
              className="text-blue-600 hover:underline mt-1"
              onClick={toggleReplies}
              disabled={loadingReplies}
            >
              {loadingReplies ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : showReplies ? (
                "Ẩn phản hồi"
              ) : (
                `Xem ${comment.replyCount} phản hồi`
              )}
            </Button>
          )}
        </div>
      </div>

      {showReplies && replies.length > 0 && (
        <div className="space-y-2 mt-2">
          {replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} level={level + 1} />
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
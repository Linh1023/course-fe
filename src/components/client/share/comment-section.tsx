"use client";

import {
  FetchServerGetApi,
  FetchServerPostApi,
  FetchServerPutApi,
} from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentAccountContext } from "@/context/current_account_context";
import { formatTimeShort } from "@/utils/format_time";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CommentItem } from "./comment-item";

interface Props {
  comments: CommentClientResponse;
  lessonId: string;
}
const CommentSection = ({ comments: initialComments, lessonId }: Props) => {
  const [comments, setComments] = useState<CommentClient[]>(
    initialComments.result || []
  );
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(initialComments.totalPages || 1);
  const [loadingMore, setLoadingMore] = useState(false);
  const currentAccount: CurrentAccountResponse | null =
    useCurrentAccountContext().currentAccount;
  const [replies, setReplies] = useState<CommentClient[]>([]);
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = async (page: number, append = false) => {
    setLoadingMore(true);
    const data = await FetchServerGetApi(
      `${API.COMMENT.PUBLIC_LESSON_COMMENT}?lessonId=${lessonId}&pageIndex=${page}`
    );
    console.log(
      `${API.COMMENT.PUBLIC_LESSON_COMMENT}?lessonId=${lessonId}&pageIndex=${page}`
    );
    setComments((prev) => (append ? [...prev, ...data.result] : data.result));
    setTotalPages(data.totalPages);
    setLoadingMore(false);
  };

  

  const handleSubmitNewComment = async () => {
    if (!replyContent.trim()) return;
    setSubmitting(true);
    const res = await FetchServerPostApi(API.COMMENT.COMMENT, {
      lessonId,
      
      content: replyContent,
    });
    console.log(res)
    if (res.status == 200) {
      setReplyContent("");
      setComments((prev) => [...prev, res.result]);
    } else {
      console.error("Failed to submit reply:");
    }
    setSubmitting(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // optional: chặn xuống dòng (nếu dùng textarea thì mới cần)
      handleSubmitNewComment();
    }
  };
  useEffect(() => {
    fetchComments(pageIndex, false);
  }, [pageIndex]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Bình luận
      </h2>
      <div className="space-y-4 mw-[500px]">
        {comments?.map((comment) => (
          <Card
            key={comment.id}
            className="border-0 shadow-none bg-transparent"
          >
            <CardContent className="p-0">
              <CommentItem
                comment={comment}
                lessonId={lessonId}
                currentAccount={currentAccount ?? undefined}
              />
            </CardContent>
          </Card>
        ))}
      </div>
      {pageIndex + 1 < totalPages && (
        <div className="flex justify-center mt-4">
          <Button
            variant="link"
            className="text-blue-600 hover:underline"
            onClick={() => fetchComments(pageIndex + 1, true)}
            disabled={loadingMore}
          >
            {loadingMore ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              "Xem thêm bình luận"
            )}
          </Button>
        </div>
      )}
      <div className="mt-2 relative bg-white dark:bg-black">
        <Textarea
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder="Viết phản hồi..."
          className="pr-[45px] min-h-10 h-auto max-h-40 text-sm "
          onKeyDown={handleKeyDown}
        />
        <Button
          size="sm"
          onClick={handleSubmitNewComment}
          className="absolute top-1 right-1 h-8 px-3 text-sm"
          disabled={submitting || !replyContent.trim()}
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Gửi"}
        </Button>
      </div>

      <Separator className="mt-6" />
      <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
        Cập nhật lần cuối: {formatTimeShort(new Date().toISOString())}
      </div>
    </div>
  );
};

export default CommentSection;

"use client";

import API from "@/api/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentAccountContext } from "@/context/current_account_context";
import { formatTimeShort } from "@/utils/format_time";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CommentLessonItem } from "./comment_lesson_item";
import { FetchClientGetApi } from "@/actions/client/fetch_client_api";
import { FetchServerPostApi } from "@/actions/server/fetch_server_api";
import { LoaderIcon } from "@/components/share/loading-icon";

interface Props {
  lessonId: string;
}
const CommentLessonSection = ({ lessonId }: Props) => {
  const [comments, setComments] = useState<CommentClient[]>([]);
  const currentAccount: CurrentAccountResponse | null =
    useCurrentAccountContext().currentAccount;
  const [page, setpage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // hàm lấy thêm data nếu còn nhiều comment > 10
  const fetchComments = async (page: number, append?: boolean) => {
    setLoadingMore(true);
    const data: CommentClientResponse = await FetchClientGetApi(
      `${API.COMMENT.COMMENT_LESSON}?lessonId=${lessonId}&page=${page}`
    );
    if (data.status == 200) {
      setComments((prev) =>
        append ? [...prev, ...data.result] : data?.result
      );
      setTotalItems(data.totalItems);
      setLoadingMore(false);
    }
  };

  //hàm xử lý thêm comment mới
  const handleSubmitNewComment = async () => {
    if (!replyContent.trim()) return;
    setSubmitting(true);
    const res = await FetchServerPostApi(API.COMMENT.COMMENT, {
      lessonId,
      content: replyContent,
    });
    if (res.status == 200) {
      setReplyContent("");
      // setComments((prev) => [...prev, res.result]);
      setComments([]);
      fetchComments(0);
    } else {
      console.error("Failed to submit reply:");
    }
    setSubmitting(false);
  };

  //hàm xử lý enter khi rep
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmitNewComment();
    }
  };
  useEffect(() => {
    if (comments.length == 0) {
      fetchComments(0);
    }
  }, []);
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Bình luận
      </h2>

      {(page + 1) * 10 < totalItems && (
        <div className="flex  mt-4">
          <Button
            variant="link"
            className="text-blue-600 hover:underline pl-0"
            onClick={async () => {
              await fetchComments(page + 1, true);
              setpage(page + 1);
            }}
            disabled={loadingMore}
          >
            {loadingMore ? (
              <LoaderIcon
                className="mr-1.5 size-9 animate-spin"
                aria-hidden="true"
              ></LoaderIcon>
            ) : (
              `Xem ${totalItems - (page + 1) * 10} bình luận cũ hơn`
            )}
          </Button>
        </div>
      )}
      <div className="space-y-4 mw-[500px]">
        {loadingMore && comments?.length <= 0 ? (
          <div className="w-full flex justify-center">
            <LoaderIcon
              className="mr-1.5 size-9 animate-spin"
              aria-hidden="true"
            ></LoaderIcon>
          </div>
        ) : (
          comments
            ?.slice() // Create a shallow copy to avoid mutating the original array
            .reverse()
            .map((comment: CommentClient) => (
              <Card
                key={"comment-card-" + comment.id}
                className="border-0 shadow-none bg-transparent"
              >
                <CardContent
                  className="p-0"
                  key={"comment-card-content-" + comment.id}
                >
                  <CommentLessonItem
                    key={"comment-item-" + comment.id}
                    comment={comment}
                    lessonId={lessonId}
                    currentAccount={currentAccount ?? undefined}
                  />
                </CardContent>
              </Card>
            ))
        )}
      </div>
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

export default CommentLessonSection;

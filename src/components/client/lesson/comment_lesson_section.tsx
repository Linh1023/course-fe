"use client";

import API from "@/api/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentAccountContext } from "@/context/current_account_context";
import { formatTimeShort } from "@/utils/format_time";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { CommentLessonItem } from "./comment_lesson_item";
import {
  FetchServerGetApi,
  FetchServerPostApi,
} from "@/actions/server/fetch_server_api";
import { LoaderIcon } from "@/components/share/loading-icon";

interface CommentSectionProps {
  lessonId: string;
}

const CommentLessonSection = ({ lessonId }: CommentSectionProps) => {
  const [comments, setComments] = useState<CommentClient[]>([]);
  const currentAccount: CurrentAccountResponse | null =
    useCurrentAccountContext().currentAccount;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to fetch more comments if there are more than 10
  const fetchComments = async (page: number, append = false) => {
    setIsLoadingMore(true);
    const data: CommentClientResponse = await FetchServerGetApi(
      `${API.COMMENT.COMMENT_LESSON}?lessonId=${lessonId}&page=${page}`
    );
    if (data.status === 200) {
      setComments((prev) =>
        append ? [...prev, ...data.result] : data?.result
      );
      setCurrentPage(data.currentPage);
      setTotalComments(data.totalItems);
      setIsLoadingMore(false);
    }
  };

  // Function to handle submitting a new comment
  const handleSubmitNewComment = async () => {
    if (!newCommentContent.trim()) return;
    setIsSubmitting(true);
    const res = await FetchServerPostApi(API.COMMENT.COMMENT, {
      lessonId,
      content: newCommentContent,
    });
    if (res.status === 200) {
      await fetchComments(0);
      setNewCommentContent("");
    } else {
      console.error("Failed to submit reply:");
    }
    setIsSubmitting(false);
  };

  // Function to handle 'Enter' key press for submitting replies
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmitNewComment();
    }
  };

  const handleDeleteComment = () => {
    fetchComments(0);
  };

  useEffect(() => {
    if (comments.length === 0) {
      fetchComments(0);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Bình luận
      </h2>

      {(currentPage + 1) * 10 < totalComments && (
        <div className="flex mt-4">
          <Button
            variant="link"
            className="text-blue-600 hover:underline pl-0"
            onClick={async () => {
              await fetchComments(currentPage + 1, true);
            }}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <LoaderIcon
                className="mr-1.5 size-9 animate-spin"
                aria-hidden="true"
              ></LoaderIcon>
            ) : (
              `Xem ${totalComments - (currentPage + 1) * 10} bình luận cũ hơn`
            )}
          </Button>
        </div>
      )}
      <div className="space-y-4 mw-[500px]">
        {isLoadingMore && comments?.length <= 0 ? (
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
                    onDelete={handleDeleteComment}
                  />
                </CardContent>
              </Card>
            ))
        )}
      </div>
      <div className="mt-2 relative bg-white dark:bg-black">
        <Textarea
          value={newCommentContent}
          onChange={(e) => setNewCommentContent(e.target.value)}
          placeholder="Viết phản hồi..."
          className="pr-[45px] min-h-10 h-auto max-h-40 text-sm "
          onKeyDown={handleKeyDown}
        />
        <Button
          size="sm"
          onClick={handleSubmitNewComment}
          className="absolute top-1 right-1 h-8 px-3 text-sm"
          disabled={isSubmitting || !newCommentContent.trim()}
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Gửi"}
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
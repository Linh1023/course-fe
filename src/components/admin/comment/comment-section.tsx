"use client";

import { FetchServerGetApiNoToken } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CommentItem } from "./comment-item";

interface Props {
  comments: { result: CommentClient[]; totalPages: number };
  lessonId: string;
}

const CommentSection = ({ comments: initialComments, lessonId }: Props) => {
  const [comments, setComments] = useState<CommentClient[]>(
    initialComments.result || []
  );
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(initialComments.totalPages || 1);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchComments = async (page: number, append = false) => {
    setLoadingMore(true);
    const data = await FetchServerGetApiNoToken(
      `${API.COMMENT.PUBLIC_LESSON_COMMENT}/${lessonId}?pageIndex=${page}`
    );
    setComments((prev) => (append ? [...prev, ...data.result] : data.result));
    setTotalPages(data.totalPages);
    setLoadingMore(false);
  };

  useEffect(() => {
    fetchComments(pageIndex, false);
  }, [pageIndex]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold">Bình luận</h2>

      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id} className="border-0 shadow-none">
            <CardContent className="p-0">
              <CommentItem comment={comment} />
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
              "Xem thêm"
            )}
          </Button>
        </div>
      )}

      <Separator className="mt-6" />
    </div>
  );
};

export default CommentSection;
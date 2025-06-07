"use server";

import {
  FetchServerGetApiNoToken,
} from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import CommentSection from "@/components/admin/comment/comment-section";

import { redirect } from "next/navigation"; // Import hàm redirect
const CommentLessonPage = async (props: any) => {
  const { params } = props;
  const resComment: CommentClientResponse = await FetchServerGetApiNoToken(
    API.COMMENT.PUBLIC_LESSON_COMMENT + `?lessonId=${params.id}`
  );

  if (resComment && resComment.status != 200) {
    redirect("/");
  }

  return (
    <>
      <CommentSection comments={resComment} lessonId={params.id} />
    </>
  );
};

export default CommentLessonPage;

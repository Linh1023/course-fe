import { FetchServerGetApiNoToken } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import CommentCourseSection from "@/components/client/course/comment-course-section";
import { redirect } from "next/navigation";

const PageCourseComment = async (props: any) => {
  const { params } = props;
  const commentResponse: CommentClientResponse = await FetchServerGetApiNoToken(
    `${API.COMMENT.PUBLIC_COMMENT_COURSE}?courseId=${params.id}`
  );
  if (commentResponse && commentResponse.status != 200) {
    redirect("/");
  }
  return (
    <>  
      <CommentCourseSection
        comments={commentResponse?.result}
        courseId={params.id}
      />
    </>
  );
};

export default PageCourseComment;

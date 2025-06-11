"use server"

import { FetchServerGetApi } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import LessonWrapper from "@/components/client/lesson/lesson_wrapper"

import { redirect } from 'next/navigation'; // Import hàm redirect
const LessonPage = async (props: any) => {
     const { params } = props;
    const res = await FetchServerGetApi(`${API.LESSON.GET_LESSON}/${params.id}`);
    let lessonResponse:LessonClientDetailResponse|null = null
    if (res && res.status === 200) {
         lessonResponse = res.result
    } else {
        redirect("/")
    }
  const commentResponse: CommentClientResponse = await FetchServerGetApi(
    API.COMMENT.PUBLIC_LESSON_COMMENT + `?lessonId=${params.id}`
  );

  if (commentResponse && commentResponse.status != 200) {
    redirect("/");
  }

    return (
        <>
           {/* <div className="fixed top-68 left-0 h-full w-full z-30"> */}
           <LessonWrapper
           lessonResponse = {lessonResponse!}
           commentResponse={commentResponse}
           />
           {/* </div> */}
        </>
    )
}

export default LessonPage
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

    return (
        <>
           {/* <div className="fixed top-68 left-0 h-full w-full z-30"> */}
           <LessonWrapper
           lessonResponse = {lessonResponse!}
           />
           {/* </div> */}
        </>
    )
}

export default LessonPage
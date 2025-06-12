"use client"

import LessonTabs from "./lesson_tabs"
import LessonVideo from "./lesson_video"
interface Props {
    lessonResponse:LessonClientDetailResponse
    commmentResponse:CommentClientResponse
}
const LessonContent = (props: Props) => {
    const { lessonResponse,commmentResponse } = props
    return (
        <>
        {/* <div className="p-2"> */}
           <LessonVideo
           lessonResponse = {lessonResponse}
           />
           <LessonTabs
              lessonResponse = {lessonResponse}
              commmentResponse={commmentResponse}
           />
        {/* </div> */}
        </>
    )
}
export default LessonContent
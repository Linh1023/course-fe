"use client"

import LessonTabs from "./lesson_tabs"
import LessonVideo from "./lesson_video"
interface Props {
    lessonResponse:LessonClientDetailResponse
}
const LessonContent = (props: Props) => {
    const { lessonResponse } = props
    return (
        <>
        {/* <div className="p-2"> */}
           <LessonVideo
           lessonResponse = {lessonResponse}
           />
           <LessonTabs
              lessonResponse = {lessonResponse}
           />
        {/* </div> */}
        </>
    )
}
export default LessonContent
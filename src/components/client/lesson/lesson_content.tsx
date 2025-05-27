"use client"

import LessonTabs from "./lesson_tabs"
import LessonVideo from "./lesson_video"

const LessonContent = () => {
    return (
        <>
        <div className="p-2">
           <LessonVideo/>
           <LessonTabs/>
        </div>
        </>
    )
}
export default LessonContent
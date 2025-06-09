"use client"

import { useTheme } from "next-themes"

interface Props {
    course: StatCourseEnrollResponse
}

const StatCourseCard = (props: Props) => {
    const { course } = props
    let { theme } = useTheme()
    theme = theme === "system" ? "dark" :theme
    return (
        <>
            {/* Course Image Placeholder */}
            <div className="w-[90px] h-[60px] bg-blue-100 rounded-lg flex-shrink-0">
                <img
                 className="w-full h-full object-cover"
                src={course.imgUrl} 
                alt={course.name}
                />
            </div>
            {/* Course Info */}
            <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                    <h3 className=  {`${theme === 'dark' ? "text-gray-200" : "text-gray-900 "}  font-medium line-clamp-3`}>
                        {course.name}
                    </h3>
                </div>
                <p className="text-sm text-gray-500">
                    {course.enrollmentCount} người đã đăng ký
                </p>
            </div>


        </>
    )
}

export default StatCourseCard
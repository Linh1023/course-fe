import React from 'react'
import CourseCard from '../profile/CourseCard'

interface Course {
  image: string
  title: string
  instructor: string
}

interface CourseListProps {
  title: string
  courses: Course[]
  layout?: 'grid' | 'list'
  seeMoreLink?: string
}

const CourseList: React.FC<CourseListProps> = ({
  title,
  courses,
  layout = 'grid',
  seeMoreLink,
}) => {
  const layoutClass =
    layout === 'grid'
      ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
      : 'flex flex-col gap-4'

  const displayCourses = seeMoreLink ? courses.slice(0, 4) : courses

  return (
    <div className="space-y-4">
      {/* Tiêu đề + nút xem thêm trên cùng một dòng */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {seeMoreLink && courses.length > 4 && (
          <a
            href={seeMoreLink}
            className="text-sm text-red-500 hover:underline"
          >
            Xem thêm
          </a>
        )}
      </div>

      {/* Danh sách khóa học */}
      <div className={layoutClass}>
        {displayCourses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  )
}

export default CourseList

import React from 'react'
import CourseCard from '../profile/CourseCard'

interface CourseListProps {
  title: string
  courses: CourseCardResponse[]
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
      ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
      : 'flex flex-col gap-4'

  // console.log('courses', courses)
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {seeMoreLink && (
          <a
            href={seeMoreLink}
            className="text-sm text-red-500 hover:underline"
          >
            Xem thêm
          </a>
        )}
      </div>

      <div className={layoutClass}>
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  )
}

export default CourseList

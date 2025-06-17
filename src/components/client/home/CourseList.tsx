import React from 'react'
import CourseCard from '../profile/CourseCard'
import Link from 'next/link'
import { useQuerySearchClientContext } from '@/context/query_search_client_context'

interface CourseListProps {
  title: string
  courses: CourseCardResponse[]
  layout?: 'grid' | 'list'
  seeMoreLink?: string
  isProgress?: boolean
}

const CourseList: React.FC<CourseListProps> = ({
  title,
  courses,
  layout = 'grid',
  seeMoreLink,
  isProgress,
}) => {
  const layoutClass =
    layout === 'grid'
      ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
      : 'flex flex-col gap-4'
  const { querySearch, setQuerySearch } = useQuerySearchClientContext()
  // console.log('courses', courses)
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {seeMoreLink && (
          <Link
            href={`/search?${seeMoreLink}`}
            className="text-sm text-red-500 hover:underline"
            onClick={() => {
              const newQuerySearch = seeMoreLink
              if (newQuerySearch != querySearch) {
                setQuerySearch(newQuerySearch)
              }
            }}
          >
            Xem thêm
          </Link>
        )}
      </div>

      <div className={layoutClass}>
        {courses.map((course, index) => (
          <CourseCard key={index} course={course}
            isProgress={isProgress}
          />
        ))}
      </div>
    </div>
  )
}

export default CourseList

import React from 'react'
import CourseCard from '../profile/CourseCard'
import Link from 'next/link'
import { useQuerySearchClientContext } from '@/context/query_search_client_context'
import { CircleArrowRight } from 'lucide-react'

interface CourseListProps {
  title: string
  courses: CourseCardResponse[]
  layout?: 'grid' | 'list'
  seeMoreLink?: string
  isProgress?: boolean
  svg?: React.ReactNode
}

const CourseList: React.FC<CourseListProps> = ({
  title,
  courses,
  layout = 'grid',
  seeMoreLink,
  isProgress,
  svg
}) => {
  const layoutClass =
    layout === 'grid'
      ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
      : 'flex flex-col gap-4'
  const { querySearch, setQuerySearch } = useQuerySearchClientContext()

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className='flex items-center gap-x-2' >
          {svg && (<>
            {svg}
          </>)}
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>

        {seeMoreLink && (
          <Link
            href={`/search?${seeMoreLink}`}
            className="text-sm text-red-500 hover:underline font-bold"
            onClick={() => {
              const newQuerySearch = seeMoreLink
              if (newQuerySearch != querySearch) {
                setQuerySearch(newQuerySearch)
              }
            }}
          >
            <div  className='flex items-center'>
              <span className='mr-[10px]'>
                Xem thêm
              </span>
              <CircleArrowRight />
            </div>
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

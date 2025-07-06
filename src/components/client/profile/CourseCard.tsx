// src/components/client/profile/CourseCard.tsx
"use client"
import { randomQueryString } from '@/utils/random_query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import NProgress from 'nprogress'
import API from '@/api/api';
import { formatTimeWithDaysHoursMinutes } from '@/utils/format_time';
import { useRandomQuery } from '@/context/random_query_context';
interface CourseCardProps {
  course: CourseCardResponse;
  isProgress?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = React.memo(({ course, isProgress }) => {
  const router = useRouter()

  const progressPercentage = course.totalLessons > 0
    ? Math.round((course.viewedLessons / course.totalLessons) * 100)
    : 0;

  const getProgressColor = () => {
    if (course.status === 'completed') return 'bg-green-500';
    if (progressPercentage >= 75) return 'bg-blue-500';
    if (progressPercentage >= 50) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  const getStatusText = () => {
    if (course.status === 'completed') return 'Hoàn thành';
    if (course.status === 'inProgress') return 'Đang học';
    return 'Chưa bắt đầu';
  };

  const handleRedirect = () => {
    NProgress.start()
    router.push(`/course/${course.id}?${randomQueryString()}`)
  }

  //  const randomQuery = useRandomQuery()

  return (
    <div
      onClick={() => { handleRedirect() }}
    >
      <Link href={`/course/${course.id}`}
      
      >
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
        // onClick={() => { handleRedirect() }}
        >
          <div className="aspect-video bg-gray-200 overflow-hidden">
            <img
              src={`${API.IMAGE.VIEW}/${course.imageUrl}`}
              alt={course.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-[49px]">
              {course.name}
            </h3>

            {typeof course.price === 'number' && course.price > 0 && !isProgress && (
              <p className="text-[17px] text-red-500 mb-3 font-bold truncate">
                {course.price.toLocaleString('vi-VN')}đ
              </p>
            )}

            {course.totalLessons && course.totalDuration && (
              <div className="flex items-center  gap-6 text-sm text-gray-600 bg-gray-50 px-3 py-3 rounded-lg border">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="font-medium">{course.totalLessons}</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{formatTimeWithDaysHoursMinutes(course.totalDuration, false)}</span>
                </div>
              </div>
            )}

            {isProgress && (
              <div className="mb-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Tiến độ: {course.viewedLessons}/{course.totalLessons} bài học
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${course.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : course.status === 'inProgress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                    }`}>
                    {getStatusText()}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>

                <div className="text-right mt-1">
                  <span className="text-sm font-medium text-gray-700">
                    {progressPercentage}%
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>


  );
});

CourseCard.displayName = 'CourseCard';

export default CourseCard;
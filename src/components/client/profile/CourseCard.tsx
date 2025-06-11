import React from 'react';

interface CourseCardProps {
  course: CourseCardResponse;
  isProgress?: boolean;
}

const CourseCard = React.memo(({ course, isProgress }: CourseCardProps) => {
  // Tính phần trăm tiến độ
  const progressPercentage = course.totalLessons > 0 
    ? Math.round((course.viewedLessons / course.totalLessons) * 100) 
    : 0;

  // Xác định màu sắc dựa trên trạng thái
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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="aspect-video bg-gray-200 overflow-hidden">
        <img
          src={course.imageUrl || '/placeholder-course.jpg'}
          alt={course.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 truncate">
          {course.name}
        </h3>

        {typeof course.price === 'number' && course.price > 0 && !isProgress && (
          <p className="text-md text-red-500 mb-3 font-bold truncate">
            {course.price.toLocaleString('vi-VN')}đ
          </p>
        )}

        {/* Thanh tiến độ - chỉ hiển thị khi isProgress = true */}
        {isProgress && (
          <div className="mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                Tiến độ: {course.viewedLessons}/{course.totalLessons} bài học
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                course.status === 'completed' 
                  ? 'bg-green-100 text-green-800' 
                  : course.status === 'inProgress'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {getStatusText()}
              </span>
            </div>

            {/* Progress bar */}
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
  );
});

export default CourseCard;
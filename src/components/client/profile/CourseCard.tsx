import React from 'react';

interface CourseCardProps {
  course: CourseCardResponse;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="aspect-video bg-gray-200 overflow-hidden">
        <img
          src={course.imageUrl}
          alt={course.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.name}
        </h3>

        {/* Chỉ hiển thị giá nếu có */}
        {course.price && (
          <p className="text-md text-red-500 mb-3 font-bold">
            {course.price}đ
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseCard;

import React from 'react';
import { Star } from 'lucide-react';

interface Course {
  image: string;
  title: string;
  instructor: string;
  ratings: number;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="aspect-video bg-gray-200 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          By {course.instructor}
        </p>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                className="text-yellow-400 fill-current"
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            ({course.ratings})
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
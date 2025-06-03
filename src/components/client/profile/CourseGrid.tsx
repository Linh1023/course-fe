import React from 'react';
import CourseCard from './CourseCard';

interface Course {
  id: string;
  title: string;
  image: string;
  instructor: string;
  ratings: number;
  // Add other properties as needed
}

interface CoursesGridProps {
  courses: CourseCardResponse[];
}

const CoursesGrid: React.FC<CoursesGridProps> = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </div>
  );
};

export default CoursesGrid;
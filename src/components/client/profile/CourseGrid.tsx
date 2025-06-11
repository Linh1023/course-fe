import React from 'react';
import CourseCard from './CourseCard';

interface CoursesGridProps {
  courses: CourseCardResponse[];
  isProgress?: boolean;
}

const CoursesGrid: React.FC<CoursesGridProps> = ({ courses, isProgress }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <CourseCard 
          key={index} 
          course={course} 
          isProgress={isProgress}
        />
      ))}
    </div>
  );
};

export default CoursesGrid;
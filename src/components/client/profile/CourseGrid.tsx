import React from 'react';
import CourseCard from './CourseCard';

interface CoursesGridProps {
  courses: CourseCardResponse[];
  isProgress?: boolean;
}

const CoursesGrid = React.memo(({ courses, isProgress }: CoursesGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard 
          key={course.id || course.name} // Sử dụng id nếu có, hoặc name làm key
          course={course} 
          isProgress={isProgress}
        />
      ))}
    </div>
  );
});

export default CoursesGrid;
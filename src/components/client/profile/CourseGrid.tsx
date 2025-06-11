// src/components/client/profile/CoursesGrid.tsx
import React from 'react';
import CourseCard from './CourseCard';

interface CoursesGridProps {
  courses: CourseCardResponse[];
  isProgress?: boolean;
}

const CoursesGrid: React.FC<CoursesGridProps> = React.memo(({ courses, isProgress }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard 
          key={course.id} // Assuming course.id exists; replace with a unique identifier if different
          course={course} 
          isProgress={isProgress}
        />
      ))}
    </div>
  );
});

CoursesGrid.displayName = 'CoursesGrid';

export default CoursesGrid;
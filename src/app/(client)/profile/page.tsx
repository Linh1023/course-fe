import React from 'react';
// Update the import path to the correct location and extension for ProfileTab
// Update the import path below to the correct relative path and extension for ProfileTab
import ProfileTab from '@/components/client/profile/ProfileTab';
import SearchHeader from '@/components/client/profile/SearchHeader';
import CoursesGrid from '@/components/client/profile/CourseGrid';

const ProfilePage = () => {
  return (
    <div className="flex justify-center min-h-screen">
      <ProfileTab />
      {/* <div className="flex-1 p-8">
        <SearchHeader coursesCount={12} />
        <CoursesGrid courses={mockCourses} />
      </div> */}
    </div>
  );
};

export default ProfilePage;
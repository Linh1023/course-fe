import { CourseChapters } from "@/components/client/course/course_chapter";
import CommentCourseSection from "./comment-course-section";

interface Props {
  course: CourseClientResponse | null;
  commentsResponse: CommentClientResponse;
}


const CourseInfoSection = ({ course, commentsResponse }: Props) => {
  return (
    <>

      {/* <div className="w-full md:w-2/3 space-y-6">
        <h1 className="text-3xl font-bold">{course?.name}</h1>
        <p className="text-sm text-muted-foreground">{course?.detail}</p>
        <CourseChapters chapters={course?.chapters || []} />
        <div className="bg-[#f1f5f9] rounded-lg p-2">
          <CommentCourseSection comments={comments} courseId={course?.id ?? ""} />
        </div>
      </div> */}


      <div className="w-full md:w-2/3 space-y-8">
        {/* Course Header Section */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 leading-tight mb-3">
                {course?.name}
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>

          {course?.detail && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <p className="text-gray-700 leading-relaxed text-lg">
                {course.detail}
              </p>
            </div>
          )}
        </div>

        {/* Course Chapters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-0">
            <CourseChapters chapters={course?.chapters || []} />
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-white/80 backdrop-blur-sm px-6 py-4 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              
            </h2>
          </div>
          <div className="p-6">
            {}
            <CommentCourseSection
              commentsResponse={commentsResponse}
              courseId={course?.id ?? ""}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseInfoSection;

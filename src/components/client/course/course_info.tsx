import { CourseChapters } from "@/components/client/course/course_chapter";
import CommentCourseSection from "./comment-course-section";

interface Props {
  course: CourseClientResponse | null;
  comments: CommentClient[];
}

const CourseInfoSection = ({ course, comments }: Props) => {
  return (
    <div className="w-full md:w-2/3 space-y-6">
      <h1 className="text-3xl font-bold">{course?.name}</h1>
      <p className="text-sm text-muted-foreground">{course?.detail}</p>
      <CourseChapters chapters={course?.chapters || []} />
      <div className="bg-[#f1f5f9] rounded-lg p-2">
        <CommentCourseSection comments={comments} courseId={course?.id ?? ""} />
      </div>
    </div>
  );
};

export default CourseInfoSection;

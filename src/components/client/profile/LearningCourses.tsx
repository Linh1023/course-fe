"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchHeader from "./SearchHeader";
import PaginationCourse from "./PaginationCourse";
import { MyCourseResponse, Course } from "@/types/response/account/my_course";
import CoursesGrid from "./CourseGrid";

interface LearningCoursesProps {
  coursePromise: Promise<MyCourseResponse>;
}

export default function LearningCourses({ coursePromise }: LearningCoursesProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [totalPages, setTotalPages] = React.useState(1);

  const initialName = searchParams.get("name") || "";
  const initialPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  const [name, setName] = React.useState(initialName);
  const [page, setPage] = React.useState(initialPage);

  React.useEffect(() => {
    coursePromise.then(({ result, totalPages }) => {
      setCourses(result); // Bỏ lọc theo status
      setTotalPages(totalPages);
    });
  }, [coursePromise]);

  React.useEffect(() => {
    const params = new URLSearchParams();
    if (name) params.set("name", name);
    params.set("page", page.toString());
    router.push(`/profile/course?${params.toString()}`, { scroll: false });
  }, [name, page, router]);

  return (
    <div className="grid gap-4">
      <SearchHeader name={name} setName={setName} setPage={setPage} />
      <CoursesGrid
        courses={courses.map((course) => ({
          ...course,
          imageUrl: course.imageUrl || "/placeholder.jpg",
          price: (course as any).price ?? 0, // Ensure price is included; adjust as needed
        }))}
      />
      <PaginationCourse
        currentPage={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
}
"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchHeader from "./SearchHeader";
import PaginationCourse from "./PaginationCourse";
import { MyCourseResponse, Course } from "@/types/response/account/my_course";
import CoursesGrid from "./CourseGrid";
import { LoaderIcon } from "@/components/share/loading-icon"

interface LearningCoursesProps {
  coursePromise: Promise<MyCourseResponse>;
}

export default function LearningCourses({ coursePromise }: LearningCoursesProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSearching, setIsSearching] = React.useState(false); // Thêm state cho search loading

  const initialName = searchParams.get("name") || "";
  const initialPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  const [name, setName] = React.useState(initialName);
  const [page, setPage] = React.useState(initialPage);

  React.useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      try {
        const { result, totalPages } = await coursePromise;
        setCourses(result);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error loading courses:", error);
      } finally {
        setIsLoading(false);
        setIsSearching(false); // Tắt search loading khi hoàn thành
      }
    };

    loadCourses();
  }, [coursePromise]);

  React.useEffect(() => {
    const params = new URLSearchParams();
    if (name) params.set("name", name);
    params.set("page", page.toString());
    router.push(`/profile/course?${params.toString()}`, { scroll: false });
  }, [name, page, router]);

  return (
    <div className="grid gap-4">
      <SearchHeader 
        name={name} 
        setName={setName} 
        setPage={setPage}
        setIsSearching={setIsSearching} // Truyền function để set search loading
      />
      
      {(isLoading || isSearching) ? ( // Hiển thị loading khi đang load hoặc đang search
        <div className="flex items-center justify-center py-8">
          <LoaderIcon className="mr-1.5 size-4 animate-spin" aria-hidden="true" />
          <span className="text-sm text-gray-600">
            {isSearching ? "Đang tìm kiếm..." : "Đang tải khóa học..."}
          </span>
        </div>
      ) : (
        <>
          <CoursesGrid
            courses={courses.map((course) => ({
              ...course,
              imageUrl: course.imageUrl || "/placeholder.jpg",
              price: (course as any).price ?? 0,
            }))}
          />
          <PaginationCourse
            currentPage={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </>
      )}
    </div>
  );
}
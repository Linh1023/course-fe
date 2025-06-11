"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchHeader from "./SearchHeader";
import PaginationCourse from "./PaginationCourse";
import { MyCourseResponse, Course } from "@/types/response/account/my_course";
import CoursesGrid from "./CourseGrid";
import { LoaderIcon } from "@/components/share/loading-icon";

interface LearningCoursesProps {
  coursePromise: Promise<MyCourseResponse>;
}

export default function LearningCourses({ coursePromise }: LearningCoursesProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSearching, setIsSearching] = React.useState(false);
  
  // Sử dụng ref để lưu trữ promise đã được xử lý và controller để cancel request
  const processedPromiseRef = React.useRef<Promise<MyCourseResponse> | null>(null);
  const abortControllerRef = React.useRef<AbortController | null>(null);

  const initialName = searchParams.get("name") || "";
  const initialPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  const [name, setName] = React.useState(initialName);
  const [page, setPage] = React.useState(initialPage);

  // Memoize coursePromise để kiểm tra thay đổi
  const stableCoursePromise = React.useMemo(() => coursePromise, [coursePromise]);

  React.useEffect(() => {
    // Nếu promise giống nhau thì không cần load lại
    if (processedPromiseRef.current === stableCoursePromise) {
      return;
    }

    // Cancel request trước đó nếu có
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const loadCourses = async () => {
      setIsLoading(true);
      
      // Tạo AbortController mới
      const controller = new AbortController();
      abortControllerRef.current = controller;
      
      try {
        processedPromiseRef.current = stableCoursePromise;
        const { result, totalPages } = await stableCoursePromise;
        
        // Kiểm tra xem request có bị cancel không
        if (!controller.signal.aborted && processedPromiseRef.current === stableCoursePromise) {
          setCourses(result);
          setTotalPages(totalPages);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Error loading courses:", error);
        }
      } finally {
        // Chỉ update loading state nếu request không bị cancel
        if (!controller.signal.aborted && processedPromiseRef.current === stableCoursePromise) {
          setIsLoading(false);
          setIsSearching(false);
        }
      }
    };

    loadCourses();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [stableCoursePromise]);

  // Tách riêng effect cho URL update để tránh interference
  React.useEffect(() => {
    const params = new URLSearchParams();
    if (name) params.set("name", name);
    params.set("page", page.toString());
    
    const newUrl = `/profile/course?${params.toString()}`;
    const currentUrl = `${window.location.pathname}${window.location.search}`;
    
    // Chỉ update URL nếu thực sự khác biệt và không phải lần đầu load
    if (newUrl !== currentUrl) {
      router.replace(newUrl, { scroll: false });
    }
  }, [name, page, router]);

  // Sync state với URL params khi component mount
  React.useEffect(() => {
    const urlName = searchParams.get("name") || "";
    const urlPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    
    if (name !== urlName) {
      setName(urlName);
    }
    if (page !== urlPage) {
      setPage(urlPage);
    }
  }, [searchParams]); // Chỉ chạy khi searchParams thay đổi

  // Kiểm tra xem có khóa học nào không
  const hasNoCourses = !isLoading && !isSearching && courses.length === 0;

  return (
    <div className="grid gap-4">
      <SearchHeader 
        name={name} 
        setName={setName} 
        setPage={setPage}
        setIsSearching={setIsSearching}
      />

      {(isLoading || isSearching) ? (
        <div className="flex items-center justify-center py-8">
          <LoaderIcon className="mr-1.5 size-4 animate-spin" aria-hidden="true" />
          <span className="text-sm text-gray-600">
            {isSearching ? "Đang tìm kiếm..." : "Đang tải khóa học..."}
          </span>
        </div>
      ) : hasNoCourses ? (
        <div className="flex items-center justify-center py-8">
          <span className="text-sm text-gray-600">Không tìm thấy khóa học</span>
        </div>
      ) : (
        <>
          <CoursesGrid
            courses={courses.map((course) => ({
              ...course,
              imageUrl: course.imageUrl || "/placeholder.jpg",
              price: (course as any).price ?? 0,
            }))}
            isProgress={true}
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
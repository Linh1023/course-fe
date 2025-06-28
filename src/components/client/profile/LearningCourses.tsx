// LearningCourses.tsx
"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchHeader from "./SearchHeader";
import PaginationCourse from "./PaginationCourse";
import { MyCourseResponse, Course } from "@/types/response/account/my_course";
import CoursesGrid from "./CourseGrid";
import { LoaderIcon } from "@/components/share/loading-icon";
import { FetchClientGetApiSignalNoToken } from "@/actions/client/fetch_client_api";
import API from "@/api/api";
import { updateQueryStringManually } from "@/utils/handle_query";


export default function LearningCourses() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);


  const initialName = searchParams.get("name") || "";
  const initialPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  const [name, setName] = React.useState(initialName);
  const [page, setPage] = React.useState(initialPage);

  const pathName = usePathname()
  const abortControllerRef = React.useRef<AbortController | null>(null); // Use ref to keep track of the controller



  const [querySearch, setQuerySearch] = React.useState(() => searchParams.toString());


  React.useEffect(() => {
    setIsLoading(true);

    fetchData();
  }, [querySearch]);


  const fetchData = async () => {
    // Huỷ request cũ nếu còn
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    const { signal } = abortController;

    try {
      const submissions = await FetchClientGetApiSignalNoToken(
        `/api/proxy/search?${querySearch}&api=${API.ACCOUNT.MY_COURSE}`,
        signal
      );

      if (submissions?.status === 200) {
        setCourses(submissions.result);
        setTotalPages(submissions.totalPages);

  
        router.replace(`${pathName}?${querySearch}`, {
          scroll: false,
        });
      }

    } catch (err: any) {
      if (err.name === 'AbortError') {
        // Yêu cầu bị huỷ, không làm gì cả
        return;
      } else {
        console.error('Lỗi khi fetch:', err);
      }
    } finally {
      // ✅ Luôn setIsLoading(false) nếu không bị huỷ
      if (!signal.aborted) {
        setIsLoading(false);
      }
    }
  };



  React.useEffect(() => {

    const newQuerySearch = updateQueryStringManually(querySearch, "page", page.toString());
    if (newQuerySearch != querySearch) {
      setIsLoading(true);
      setQuerySearch(newQuerySearch)
    }
  }, [page]);

  React.useEffect(() => {
    const newQuerySearchTemporary = updateQueryStringManually(querySearch, "name", name)
    const newQuerySearch = updateQueryStringManually(newQuerySearchTemporary, "page", "1")
    if (newQuerySearch != querySearch) {
      setIsLoading(true);
      setQuerySearch(newQuerySearch);
    }
  }, [name]);


  const hasNoCourses = !isLoading && courses.length === 0;

  return (
    <div className="grid gap-4">
      <SearchHeader
        name={name}
        setName={setName}
        setPage={setPage}

      />

      {(isLoading) ? (
        <div className="flex items-center justify-center py-8">
          <LoaderIcon className="mr-1.5 size-9 animate-spin" aria-hidden="true" />
          <span className="text-sm text-gray-600">
            {isLoading ? "Đang tìm kiếm..." : "Đang tải khóa học..."}
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
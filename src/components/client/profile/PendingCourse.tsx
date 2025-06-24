"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchHeader from "./SearchHeader";
import PaginationCourse from "./PaginationCourse";
import { MyCourseResponse, Course } from "@/types/response/account/my_course";
import CoursesGrid from "./CourseGrid";
import { LoaderIcon } from "@/components/share/loading-icon";
import { FetchServerGetApi } from "@/actions/server/fetch_server_api";
import API from "@/api/api";

// Type cho CourseEnrollment response từ backend
// Type cho CourseEnrollment
interface CourseEnrollment {
    id: number;
    accountId: string;
    courseId: string;
    status: "active" | "pending" | "inactive";
    enrolledAt: string;
}

// Type cho API response
interface CourseEnrollmentApiResponse {
    status: number;
    message: string;
    result: CourseEnrollment[];
    timestamp: number;
}

export default function PendingCourses() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [courseEnrollments, setCourseEnrollments] = React.useState<CourseEnrollment[]>([]);
    const [courses, setCourses] = React.useState<Course[]>([]);
    const [totalPages, setTotalPages] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(true);

    const initialName = searchParams.get("name") || "";
    const initialPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

    const [name, setName] = React.useState(initialName);
    const [page, setPage] = React.useState(initialPage);

    const pathName = usePathname();
    const abortControllerRef = React.useRef<AbortController | null>(null);

    React.useEffect(() => {
        setIsLoading(true);
        fetchPendingCourses();
    }, [name, page]);

    const fetchPendingCourses = async () => {
        // Huỷ request cũ nếu còn
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        try {
            // Gọi API lấy course enrollments với status pending
            const enrollmentResponse = await FetchServerGetApi(
                API.ACCOUNT.PENDING_COURSE("pending")
            );

            console.log("check course 123: ", enrollmentResponse)

            if (enrollmentResponse?.status === 200) {
                const enrollments: CourseEnrollment[] = enrollmentResponse.result;
                setCourseEnrollments(enrollments);

                // Lọc theo tên nếu có
                let filteredEnrollments = enrollments;
                if (name.trim()) {
                    // Tạm thời filter theo ID hoặc có thể cần thêm logic khác
                    filteredEnrollments = enrollments.filter(enrollment =>
                        enrollment.courseId?.toLowerCase().includes(name.toLowerCase()) ||
                        enrollment.id.toString().includes(name)
                    );
                }

                // Pagination logic (giả định mỗi trang 10 items)
                const itemsPerPage = 10;
                const startIndex = (page - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const paginatedEnrollments = filteredEnrollments.slice(startIndex, endIndex);

                setTotalPages(Math.ceil(filteredEnrollments.length / itemsPerPage));

                // Convert enrollments to courses format for display
                const coursesData: Course[] = paginatedEnrollments.map(enrollment => ({
                    id: enrollment.courseId || enrollment.id.toString(),
                    name: `Course ${enrollment.id}`, // Tạm thời, cần API trả về thông tin course
                    description: `Enrolled at: ${new Date(enrollment.enrolledAt).toLocaleDateString()}`,
                    imageUrl: "/placeholder.jpg",
                    status: enrollment.status as any,
                    enrolledAt: enrollment.enrolledAt,
                    viewedLessons: 0,
                    totalLessons: 0,
                }));

                setCourses(coursesData);
            }

        } catch (err: any) {
            if (err.name === 'AbortError') {
                return;
            } else {
                console.error('Lỗi khi fetch pending courses:', err);
            }
        } finally {
            if (!abortController.signal.aborted) {
                setIsLoading(false);
            }
        }
    };

    const hasNoCourses = !isLoading && courses.length === 0;

    return (
        <div className="grid gap-4">
            <SearchHeader
                name={name}
                setName={setName}
                setPage={setPage}
            />
            <p>Pending Courses ({courseEnrollments.length} total)</p>

            {isLoading ? (
                <div className="flex items-center justify-center py-8">
                    <LoaderIcon className="mr-1.5 size-9 animate-spin" aria-hidden="true" />
                    <span className="text-sm text-gray-600">
                        Đang tải khóa học pending...
                    </span>
                </div>
            ) : hasNoCourses ? (
                <div className="flex items-center justify-center py-8">
                    <span className="text-sm text-gray-600">
                        {name ? "Không tìm thấy khóa học pending phù hợp" : "Không có khóa học pending"}
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
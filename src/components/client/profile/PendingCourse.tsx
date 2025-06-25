"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchHeader from "./SearchHeader";
import PaginationCourse from "./PaginationCourse";
import { LoaderIcon } from "@/components/share/loading-icon";
import { FetchServerGetApi } from "@/actions/server/fetch_server_api";
import API from "@/api/api";

// Type cho Course từ API mới
interface Course {
    id: string;
    name: string;
    detail?: string | null;
    price: number;
    videoUrl?: string | null;
    imageUrl?: string | null;
    category?: any;
    status: string;
}

// Component Card cho mỗi khóa học
const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="aspect-video bg-gray-200 overflow-hidden flex items-center justify-center">
                <img
                    src={course.imageUrl || '/placeholder-course.jpg'}
                    alt={course.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-gray-900 line-clamp-2 h-[30px]">
                    {course.name}
                </h3>
                <p className="text-md text-red-500 font-bold truncate mb-2">
                    {course.price.toLocaleString('vi-VN')}đ
                </p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {course.status === 'active' ? 'Đang chờ duyệt' : course.status}
                </span>
            </div>
        </div>
    );
};

// Component Grid cho các khóa học
const CoursesGrid: React.FC<{ courses: Course[] }> = ({ courses }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    );
};

export default function PendingCourses() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [courses, setCourses] = React.useState<Course[]>([]);
    const [totalPages, setTotalPages] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(true);

    const initialName = searchParams.get("name") || "";
    const initialPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

    const [name, setName] = React.useState(initialName);
    const [page, setPage] = React.useState(initialPage);

    const abortControllerRef = React.useRef<AbortController | null>(null);

    React.useEffect(() => {
        setIsLoading(true);
        fetchPendingCourses();
    }, [name, page]);

    const fetchPendingCourses = async () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        const abortController = new AbortController();
        abortControllerRef.current = abortController;
        try {
            const perPage = 10;
            const apiUrl = `${API.ACCOUNT.PENDING_COURSE("pending")}&page=${page}&perPage=${perPage}&name=${encodeURIComponent(name)}`;

            const response = await FetchServerGetApi(apiUrl);

            if (response?.status === 200) {
                setCourses(response.result || []);
                setTotalPages(response.totalPages || 1);
            } else {
                setCourses([]);
                setTotalPages(1);
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
            {isLoading ? (
                <div className="flex items-center justify-center py-8">
                    <LoaderIcon className="mr-1.5 size-9 animate-spin" aria-hidden="true" />
                    <span className="text-sm text-gray-600">
                        Đang tải danh sách khóa học pending...
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
                    <CoursesGrid courses={courses} />
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
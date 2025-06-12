"use client"
import { Heart, GraduationCap, Users, BookOpen, ChevronsRight, ChevronsLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import StatCard from './stat_card';
import { useEffect, useState } from 'react';
import API from '@/api/api';
import { FetchServerGetApi } from '@/actions/server/fetch_server_api';
import { LoaderIcon } from '@/components/share/loading-icon';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTableSkeleton } from '../share/data-table/data-table-skeleton';
import { useRouter, useSearchParams } from 'next/navigation';
import StatCourseCard from './stat_course_card';
import { useTheme } from 'next-themes';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
const DashboardWrapper = () => {
    const [count, setCount] = useState<CountResponse[]>([])
    const [statCourseEnroll, setStatCourseEnroll] = useState<StatCourseEnrollResponse[]>([])
    const [isLoadingCount, setIsLoadingCount] = useState<boolean>(false)
    const [isLoadingStatCourse, setIsLoadingStatCourse] = useState<boolean>(false)
    const [totalPages, setTotalPages] = useState<number>(1)
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1
    const [pageCurrent, setPageCurrent] = useState<number>(currentPage)

    const useSearch = useSearchParams()

    // Cập nhật lại pageCurrent nếu URL thay đổi
    useEffect(() => {
        setPageCurrent(currentPage)
    }, [currentPage])

    const goToPage = (page: number) => {
        const validPage = Math.max(1, Math.min(totalPages, page))
        router.push(`?page=${validPage}`)
    }



    let { theme } = useTheme()
    theme = theme === "system" ? "dark" : theme

    const [mounted, setMounted] = useState(false);


    useEffect(() => {
        const fetchCount = async () => {
            setIsLoadingCount(true)
            const res = await FetchServerGetApi(API.STATISTIC.COUNT)
            if (res && res.status === 200) {
                const data: CountResponse[] = res.result
                setCount(data)
            }
            setIsLoadingCount(false)
        }
        fetchCount()
    }, [])

    useEffect(() => {
        const fetchStatCourse = async () => {
            setIsLoadingStatCourse(true)
            const res = await FetchServerGetApi(`${API.STATISTIC.STAT_COURSE_ENROLL}?${useSearch.toString()}`)
            if (res && res.status === 200) {
                const data: StatCourseEnrollResponse[] = res.result
                setStatCourseEnroll(data)
                setTotalPages(res.totalPages)
            }
            setIsLoadingStatCourse(false)
        }
        fetchStatCourse()
    }, [useSearch])


    const stats: StatCardProps[] = [
        {
            icon: <Heart className="w-6 h-6 icon-dashboard text-blue-600" />,
            count: `${count[0]?.value}/${count[0]?.total}`,
            label: "Tài khoản",
            bgColor: "bg-blue-100",
            link: "/admin/user"
        },
        {
            icon: <GraduationCap className="w-6 h-6 icon-dashboard text-yellow-600" />,
            count: `${count[1]?.value}/${count[1]?.total}`,
            label: "Khóa học",
            bgColor: "bg-yellow-100",
            link: "/admin/course"
        },
        {
            icon: <Users className="w-6 h-6 icon-dashboard text-red-600" />,
            count: `${count[2]?.value}/${count[2]?.total}`,
            label: "Học viên đăng ký",
            bgColor: "bg-red-100",
            link: "/admin/course_enrollment"
        },
        {
            icon: <BookOpen className="w-6 icon-dashboard h-6 text-purple-600" />,
            count: `${count[3]?.value}`,
            label: "Bài tập chưa chấm",
            bgColor: "bg-purple-100",
            link: "/admin/submission?page=1&status=submitted"
        }
    ];



    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Tránh mismatch server/client

    return (
        <>
            <div className="w-full max-w-9xl mx-auto p-6 ">
                {
                    isLoadingCount ? (<>
                        <div className='w-full flex justify-center' >
                            <LoaderIcon
                                className="mr-1.5 size-9 animate-spin"
                                aria-hidden="true"
                            ></LoaderIcon>
                        </div>
                    </>) : (<>
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((stat, index) => (
                                <div key={index}>
                                    <StatCard
                                        stat={stat}
                                    />
                                </div>
                            ))}
                        </div>
                    </>)
                }


                <div className={` ${isLoadingStatCourse ? "bg-transparent" : `${theme === "dark" ? "bg-black " : "bg-gray-200"}`}   rounded-lg shadow-sm p-6 max-w-xl mt-[30px] mx-auto`}>
                    {/* Header */}

                    {isLoadingStatCourse ? (<>
                        <div className='w-full flex flex-row  justify-center' >
                            <LoaderIcon
                                className="mr-1.5 size-9 animate-spin"
                                aria-hidden="true"
                            ></LoaderIcon>
                        </div>

                    </>) : (<>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className={`text-lg font-semibold ${theme === "dark" ? "text-gray-100" : " text-gray-900"}`}>
                                Top khóa học đăng ký
                            </h2>
                        </div>
                        {/* Course List */}
                        <div className="space-y-4">
                            {statCourseEnroll.map((course, index) => (
                                <div key={index} className="flex items-center space-x-4">
                                    {/* Rank Number */}
                                    <div className="flex-shrink-0">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-yellow-100 text-black bg-gray-40`}>
                                             {(pageCurrent - 1) * 5 + index + 1}
                                        </div>
                                    </div>
                                    <StatCourseCard
                                        course={course}
                                    />
                                </div>
                            ))}
                        </div>


                        <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8 w-full justify-center mt-[20px]">
                            <div className="flex items-center justify-center text-sm font-medium">
                                Page {pageCurrent} of {totalPages}
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    aria-label="Go to first page"
                                    variant="outline"
                                    className=" size-8 p-0 lg:flex"
                                    onClick={() => goToPage(1)}
                                    disabled={pageCurrent === 1}
                                >
                                    <ChevronsLeft className="size-4" aria-hidden="true" />
                                </Button>
                                <Button
                                    aria-label="Go to previous page"
                                    variant="outline"
                                    size="icon"
                                    className="size-8"
                                    onClick={() => goToPage(pageCurrent - 1)}
                                    disabled={pageCurrent === 1}
                                >
                                    <ChevronLeft className="size-4" aria-hidden="true" />
                                </Button>
                                <Button
                                    aria-label="Go to next page"
                                    variant="outline"
                                    size="icon"
                                    className="size-8"
                                    onClick={() => goToPage(pageCurrent + 1)}
                                    disabled={pageCurrent === totalPages}

                                >
                                    <ChevronRight className="size-4" aria-hidden="true" />
                                </Button>
                                <Button
                                    aria-label="Go to last page"
                                    variant="outline"
                                    size="icon"
                                    className=" size-8 lg:flex"
                                    onClick={() => goToPage(totalPages)}
                                    disabled={pageCurrent === totalPages}
                                >
                                    <ChevronsRight className="size-4" aria-hidden="true" />
                                </Button>
                            </div>
                        </div>




                    </>)}
                </div>
            </div>
        </>
    )
}
export default DashboardWrapper
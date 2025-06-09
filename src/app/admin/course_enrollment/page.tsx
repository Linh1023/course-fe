import { FetchServerGetApi } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import { CourseEnrollmentTable } from "@/components/admin/course_enrollment/course_enrollment-table";
import { DataTableSkeleton } from "@/components/admin/share/data-table/data-table-skeleton";
import { ReadonlyURLSearchParams } from "next/navigation";
import React from "react";

export interface CoursePageProps {
  searchParams: ReadonlyURLSearchParams;
}

const CourseEnrollmentPage = async ({ searchParams }: CoursePageProps) => {
  const query = new URLSearchParams(searchParams).toString();
  const courseEnrollmentPromise = FetchServerGetApi(
    API.COURSE_ENROLLMENT.ADMIN_LIST_COURSE_ENROLLMENT + `?${query}`,
    "/admin/course_enrollment"
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="h-[100px] flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Quản Lý Đăng Ký Khóa Học</h1>
      </div>
      <React.Suspense
        fallback={
          <DataTableSkeleton
            columnCount={6}
            cellWidths={["5rem", "40rem", "12rem", "5rem", "5rem", "5rem"]}
            shrinkZero
          />
        }
      >
        <CourseEnrollmentTable courseEnrollmentPromise={courseEnrollmentPromise} />
      </React.Suspense>
    </div>
  );
};

export default CourseEnrollmentPage;
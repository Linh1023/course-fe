import { FetchServerGetApi } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import { CourseEnrollmentTable } from "@/components/admin/course_enrollment/course_enrollment-table";
import { DataTableSkeleton } from "@/components/admin/share/data-table/data-table-skeleton";
import { ReadonlyURLSearchParams } from "next/navigation";
import React from "react";


const CourseEnrollmentPage =  () => {


  return (
    <div className="flex flex-col gap-4">
      <div className="h-[100px] flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Quản Lý Đăng Ký Khóa Học</h1>
      </div>

        <CourseEnrollmentTable  />

    </div>
  );
};

export default CourseEnrollmentPage;
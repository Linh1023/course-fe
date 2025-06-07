"use server";

import React from "react";
import { FetchServerGetApi } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import { DataTableSkeleton } from "@/components/admin/share/data-table/data-table-skeleton";
import MyCourse from "@/components/client/profile/MyCourse";
import { ReadonlyURLSearchParams } from "next/navigation";

export interface ProfileCoursePageProps {
  searchParams: ReadonlyURLSearchParams;
}

export default async function ProfileCoursePage({ searchParams }: ProfileCoursePageProps) {
  const query = new URLSearchParams(searchParams).toString();
  const coursePromise = FetchServerGetApi(
    `${API.ACCOUNT.MY_COURSE}${query ? `?${query}` : ""}`,
    "/profile/my-courses"
  );

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mt-[10px] border-b border-gray-200 pb-[20px]">
        Khóa học của tôi
      </h1>
      <div className="flex flex-col gap-4">
        <React.Suspense
          fallback={
            <DataTableSkeleton columnCount={3} cellWidths={["5rem", "40rem", "12rem"]} shrinkZero />
          }
        >
          <MyCourse coursePromise={coursePromise} />
        </React.Suspense>
      </div>
    </>
  );
}
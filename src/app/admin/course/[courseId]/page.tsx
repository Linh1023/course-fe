import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { DataTableSkeleton } from "@/components/admin/share/data-table/data-table-skeleton"
import React from "react";
import { ChaptersTable } from "@/components/admin/chapter/chapters-table";
import { ReadonlyURLSearchParams } from "next/navigation";
import { FetchServerGetApi } from "@/actions/server/fetch_server_api";
import API from "@/api/api";

export interface ChapterPageProps {

  params: { courseId: string }
}
const ChapterPage = ({ params }: ChapterPageProps) => {

  const courseId = params.courseId;

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <Link
          className="flex items-center justify-center w-10 h-10 hover:border-2  rounded-md "
          href={`/admin/course?page=1&perPage=10`}
        >
          <ChevronLeft className="w-8 h-8" />
        </Link>
        <h1 className="text-xl font-semibold">Quản lý chương của khóa học</h1>
      </div>
        <ChaptersTable courseId={courseId} />
 
    </div>

  );
}

export default ChapterPage;
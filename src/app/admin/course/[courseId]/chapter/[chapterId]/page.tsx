import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { DataTableSkeleton } from "@/components/admin/share/data-table/data-table-skeleton"
import React from "react";
import { ChaptersTable } from "@/components/admin/chapter/chapters-table";
import { ReadonlyURLSearchParams } from "next/navigation";
import { FetchServerGetApi } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import { LessonsTable } from "@/components/admin/lesson/lessons-table";

export interface ChapterPageProps {
  params: {
    courseId: string;
    chapterId: number;
  }
}
const ChapterPage = ({ params }: ChapterPageProps) => {

  const chapterId = params.chapterId;


  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <Link
          className="flex items-center justify-center w-10 h-10 hover:border-2  rounded-md "
          href={`/admin/course/${params.courseId}?page=1&perPage=10`}
        >
          <ChevronLeft className="w-8 h-8" />
        </Link>
        <h1 className="text-xl font-semibold">Quản lý bài học của chương</h1>
      </div>

      <LessonsTable courseId={params.courseId} chapterId={chapterId} />

    </div>

  );
}

export default ChapterPage;
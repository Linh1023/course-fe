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
  searchParams: ReadonlyURLSearchParams
  params: {
    courseId: string;
    chapterId: number;
  }
}
const ChapterPage = ({ searchParams, params }: ChapterPageProps) => {
  const paramsQuery = new URLSearchParams(searchParams);
  if (!paramsQuery.has("page")) {
    paramsQuery.set("page", "1");
  }
  const query = paramsQuery.toString();
  const chapterId = params.chapterId;
  const lessonPromise = FetchServerGetApi(`${API.LESSON.ROOT}/${chapterId}?${query}`, "/admin/course");

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <Link
          className="flex items-center justify-center w-10 h-10 hover:border-2  rounded-md "
          href={`/admin/course/${params.courseId}`}
        >
          <ChevronLeft className="w-8 h-8" />
        </Link>
        <h1 className="text-xl font-semibold">Quản lý bài học của chương</h1>
      </div>
      <React.Suspense fallback={<DataTableSkeleton
        columnCount={5}
        cellWidths={["5rem", "35rem", "12rem", "5rem", "5rem"]}
        shrinkZero
      />} >
        <LessonsTable chapterId={chapterId} lessonPromise={lessonPromise} />
      </React.Suspense>
    </div>

  );
}

export default ChapterPage;
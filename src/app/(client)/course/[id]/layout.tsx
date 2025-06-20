
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { authentication } from "@/actions/server/middleware_helpers";
import { FetchServerGetApi } from "@/actions/server/fetch_server_api";
import API from "@/api/api";

interface Props {
  children: ReactNode;
  params: { id: string };
}

export default async function CourseLayout({ children, params }: Props) {
  const auth = await authentication();

  if (auth.isAuthentication) {
    const lessonRes = await FetchServerGetApi(`${API.LESSON_PROGRESS.LAST_VIEWED_LESSON}/${params.id}`);
    if (lessonRes?.status === 200) {
      const lessonId = lessonRes.result?.lessonId;
      if (lessonId) {
        redirect(`/lesson/${lessonId}`);
      }
    }
  }

  return children;
}

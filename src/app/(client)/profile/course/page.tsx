// src/app/(client)/profile/course/page.tsx
"use server";

import React from "react";
import { FetchServerGetApi } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
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
      <MyCourse coursePromise={coursePromise} />
    </>
  );
}
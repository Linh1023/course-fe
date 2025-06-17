// src/app/(client)/profile/course/page.tsx
"use server";

import React from "react";
import { FetchServerGetApi } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import MyCourse from "@/components/client/profile/MyCourse";
import { ReadonlyURLSearchParams } from "next/navigation";



export default async function ProfileCoursePage() {

  return (
    <>
      <MyCourse  />
    </>
  );
}
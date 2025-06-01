"use client";
import { FetchClientGetApi } from "@/actions/client/fetch_client_api";
import { Button } from "../../ui/button";
import API from "@/api/api";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { getToken, removeToken } from "@/actions/server/token_store";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  FetchServerGetApi,
  FetchServerPostApi,
  FetchServerPostApiNoToken,
} from "@/actions/server/fetch_server_api";
import { useLoadingContext } from "@/context/loading_context";
import { time } from "console";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import CourseCard from "../profile/CourseCard";
import CourseList from "./CourseList";

const HomeContent = () => {
  const router = useRouter();
  const { startLoadingSpiner, stopLoadingSpiner } = useLoadingContext();

  const fakeCourses: Course[] = [
    {
      image: "https://source.unsplash.com/random/400x225?course-1",
      title: "React 18: Từ Cơ Bản Đến Nâng Cao",
      instructor: "100$",
    },
    {
      image: "https://source.unsplash.com/random/400x225?course-2",
      title: "Next.js 13 & App Router - Khóa Học Toàn Diện",
      instructor: "100$",
    },
    {
      image: "https://source.unsplash.com/random/400x225?course-3",
      title: "Tailwind CSS Pro: Thiết Kế Giao Diện Chuẩn",
      instructor: "100$",
    },
    {
      image: "https://source.unsplash.com/random/400x225?course-4",
      title: "Node.js và Express cho Backend Developer",
      instructor: "100$",
    },
    {
      image: "https://source.unsplash.com/random/400x225?course-4",
      title: "Html , css cơ bản",
      instructor: "100$",
    },
  ];
  const CourseEnroll: Course[] = [
    {
      image: "https://source.unsplash.com/random/400x225?course-1",
      title: "React 18: Từ Cơ Bản Đến Nâng Cao",
      instructor: "100$",
    },
    {
      image: "https://source.unsplash.com/random/400x225?course-2",
      title: "Next.js 13 & App Router - Khóa Học Toàn Diện",
      instructor: "100$",
    },
    {
      image: "https://source.unsplash.com/random/400x225?course-3",
      title: "Tailwind CSS Pro: Thiết Kế Giao Diện Chuẩn",
      instructor: "100$",
    },
     {
      image: "https://source.unsplash.com/random/400x225?course-3",
      title: "Tailwind CSS Pro: Thiết Kế Giao Diện Chuẩn",
      instructor: "100$",
    },
  ];

  const handleFetchData = async () => {
    startLoadingSpiner();

    await new Promise((resolve) => setTimeout(resolve, 9000));

    console.log("click ");
    const data = await FetchServerGetApi(API.AUTH.HELLO_TEST);
    if (data && data.status === 200) {
      console.log("call success >>> ", data);
    }

    stopLoadingSpiner();
  };

  return (
  <div className="p-4 h-full mb-8">
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Cột trái: chiếm 3/4 trên desktop, full trên mobile */}
      <div className="lg:col-span-3 space-y-6">
        {/* Carousel */}
        <div className="rounded-lg overflow-hidden">
          <Carousel
            className="w-full h-72"
            loop
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              <CarouselItem>
                <div className="bg-gray-300 rounded-lg h-72"></div>
              </CarouselItem>
              <CarouselItem>
                <div className="bg-red-900 rounded-lg h-72"></div>
              </CarouselItem>
              <CarouselItem>
                <div className="bg-blue-300 rounded-lg h-72"></div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>

        {/* Course lists */}
        <div className="space-y-8">
          <CourseList title="Khóa học nổi bật" courses={fakeCourses} layout="grid" seeMoreLink="/search?category=hot" />
          <CourseList title="Khóa học mới ra mắt" courses={fakeCourses} layout="grid" seeMoreLink="/search?category=hot" />
          <CourseList title="Khóa học A" courses={fakeCourses} layout="grid" seeMoreLink="/search?category=hot" />
          <CourseList title="Dành cho bạn" courses={fakeCourses} layout="grid" seeMoreLink="/search?category=hot" />
        </div>
      </div>

      {/* Cột phải: Chỉ hiện khi >= lg */}
      <div className="hidden lg:flex lg:col-span-1 flex-col space-y-4 bg-gray-100 p-4 rounded-xl">
        <h3 className="font-semibold text-lg">Đang học</h3>
        <CourseList title="Khóa học đang học" courses={CourseEnroll} layout="list" />

        {/* Social Icons */}
        <div className="flex gap-4 items-center justify-center pt-4">
          <div className="w-8 h-8 bg-gray-400 rounded"></div>
          <div className="w-8 h-8 bg-gray-400 rounded"></div>
        </div>
      </div>
    </div>
  </div>
)
};

export default HomeContent;

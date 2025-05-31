"use client";
import { FetchClientGetApi } from "@/actions/client/fetch_client_api";
import { Button } from "../../ui/button";
import API from "@/api/api";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { getToken, removeToken } from "@/actions/server/token_store";
import Autoplay from "embla-carousel-autoplay"
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

const HomeContent = () => {
  const router = useRouter();
  const { startLoadingSpiner, stopLoadingSpiner } = useLoadingContext();

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
    <>
      {/* <Button
                onClick={() => { handleFetchData() }}
            >Fetch dữ liệu</Button> */}
      <div className="flex p-4 gap-4 border border-blue-400 h-screen">
        {/* Cột trái lớn */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Khối lớn trên cùng */}
          <div className="w-full rounded-lg  ">
            <Carousel
            className="w-full h-72 rounded-lg"
            loop
              plugins={[
                Autoplay(
                  {
                  delay: 2000,
                }),

              ]}
            >
              <CarouselContent>
                <CarouselItem>
                  <div className="bg-gray-300 rounded-lg   h-72"></div>
                </CarouselItem>
                <CarouselItem>
                  <div className="bg-red-900 rounded-lg   h-72"></div>
                </CarouselItem>
                <CarouselItem>
                  <div className="bg-blue-300 rounded-lg  h-72"></div>
                </CarouselItem>
              </CarouselContent>
              {/* <CarouselPrevious />
              <CarouselNext /> */}
            </Carousel>
          </div>

          {/* Tiêu đề và nút đóng */}
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Khóa Học A</h2>
            <button className="text-black rounded-full bg-gray-300 w-6 h-6 flex items-center justify-center">
              ✕
            </button>
          </div>

          {/* Danh sách card khóa học - bạn thay thế bằng component riêng */}
          <div className="flex gap-4">
            <Card />
            <Card />
            <Card />
            <CourseCard />

          </div>
        </div>

        {/* Cột phải nhỏ */}
        <div className="w-60 flex flex-col gap-4">
          <h3 className="font-semibold">Đang Học</h3>

          {/* Danh sách khóa học đang học */}
          <div>
            {/* Component progress card */}
            <div className="bg-gray-300 rounded-md p-2 mb-2">
              {/* Nội dung progress */}
            </div>
            <div className="bg-gray-300 rounded-md p-2 mb-2">
              {/* Nội dung progress */}
            </div>
            <div className="bg-gray-300 rounded-md p-2 mb-2">
              {/* Nội dung progress */}
            </div>
            <div className="bg-gray-300 rounded-md p-2">
              {/* Nội dung progress */}
            </div>
          </div>

          {/* Icon Zalo & Facebook */}
          <div className="flex gap-4 mt-auto items-center justify-center">
            <div className="w-8 h-8 bg-gray-400 rounded"></div>
            <div className="w-8 h-8 bg-gray-400 rounded"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeContent;

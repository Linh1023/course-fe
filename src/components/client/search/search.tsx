"use client";

import {
  FetchServerGetApi,
  FetchServerGetApiNoToken,
} from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CourseList from "../home/CourseList";

const Search = () => {
  const searchParams = useSearchParams();
  const [research, setResearch] = useState<CourseCardResponse[]>([]);
  useEffect(() => {
    console.log("Search params:", searchParams.toString());

    const fetch = async () => {
      const res = await FetchServerGetApiNoToken(
        API.COURSE.COURSE_FILTER + `?${searchParams.toString()}&size=12`
      );
      if (res && res.status === 200) {
        setResearch(res.result);
        console.log("Search results:", res.result);
        // Handle the search results here, e.g., update state or display results
      } else {
        console.error("Failed to fetch search results:", res);
      }
    };
    fetch();
  }, [searchParams]);

  return (
    <>
      <div className="p-4 h-full min-h-[55vh] mt-4 mb-8 flex gap-6">
        {/* Phần danh sách khóa học chiếm 3/4 */}
        <div className="w-4/5">
          <div className="space-y-8">
            <CourseList
              title="Kết quả tìm kiếm"
              courses={research}
              layout="grid"
            />
          </div>
        </div>

        {/* Thanh nav bên cạnh chiếm 1/4 */}
        <nav className="w-1/5 bg-gray-100 p-4 rounded-lg shadow-sm">
          {/* Nội dung danh mục */}
          <h2 className="text-lg font-semibold mb-4">Danh mục khóa học</h2>
          {/* Ví dụ danh mục */}
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                Danh mục 1
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                Danh mục 2
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                Danh mục 3
              </a>
            </li>
            {/* Thêm danh mục tương ứng */}
          </ul>
        </nav>
      </div>
    </>
  );
};
export default Search;

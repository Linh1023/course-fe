"use client";

import { FetchServerGetApiNoToken } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CourseList from "../home/CourseList";

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [research, setResearch] = useState<CourseCardResponse[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortType, setSortType] = useState<string>("");

  const handleSortChange = (sort: string) => {
    const isSame = sortType === sort;
    const newSort = isSame ? "" : sort;
    setSortType(newSort);

    const params = new URLSearchParams(searchParams.toString());

    if (newSort) {
      params.set("sort", newSort);
    } else {
      params.delete("sort");
    }

    params.set("page", "0"); // Reset về trang đầu
    router.push(`/search?${params.toString()}`);
  };

  // ✅ Khi chọn 1 danh mục (radio)
  const handleCategorySelect = (id: string) => {
    const isAlreadySelected = selectedCategory === id;
    const newSelected = isAlreadySelected ? "" : id;
    setSelectedCategory(newSelected);

    const params = new URLSearchParams(searchParams.toString());

    if (newSelected) {
      params.set("category", newSelected);
    } else {
      params.delete("category");
    }

    params.set("page", "0");
    router.push(`/search?${params.toString()}`);
  };

  // ✅ Lấy danh mục từ API
  useEffect(() => {
    const fetchCategory = async () => {
      const res = await FetchServerGetApiNoToken(API.CATEGORY.ROOT);
      if (res && res.status === 200) {
        setCategories(res.result);
      } else {
        console.error("Failed to fetch categories:", res);
      }
    };
    fetchCategory();
  }, []);

  // ✅ Đồng bộ kết quả tìm kiếm và danh mục từ URL
  useEffect(() => {
    const sortParam = searchParams.get("sort");
    setSortType(sortParam || "");
    const fetch = async () => {
      const res = await FetchServerGetApiNoToken(
        API.COURSE.COURSE_FILTER + `?${searchParams.toString()}&size=12`
      );
      if (res && res.status === 200) {
        setResearch(res.result);
      } else {
        console.error("Failed to fetch search results:", res);
      }
    };
    fetch();

    // ✅ Đồng bộ lại category từ URL khi load
    const categoryParam = searchParams.get("category");
    setSelectedCategory(categoryParam || "");
  }, [searchParams]);

  return (
    <div className="p-4 h-full min-h-[55vh] mt-4 mb-8 flex gap-6">
      {/* Danh sách khóa học */}
      <div className="w-4/5">
        <div className="space-y-8">
          <CourseList
            title="Kết quả tìm kiếm"
            courses={research}
            layout="grid"
          />
        </div>
      </div>

      {/* Sidebar danh mục */}
      <nav className="w-1/5 bg-white border border-gray-200 p-4 rounded-xl shadow-md sticky top-24 h-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-medium text-gray-600">Sắp xếp:</span>
          <button
            onClick={() => handleSortChange("newest")}
            className={`px-3 py-1 rounded-md border text-sm transition-all ${
              sortType === "newest"
                ? "bg-blue-100 text-blue-700 border-blue-500"
                : "text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
          >
            Mới nhất
          </button>
          <button
            onClick={() => handleSortChange("hot")}
            className={`px-3 py-1 rounded-md border text-sm transition-all ${
              sortType === "hot"
                ? "bg-red-100 text-red-700 border-red-500"
                : "text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
          >
            Hot
          </button>
        </div>

        <h2 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">
          Danh mục khóa học
        </h2>


        <div className="space-y-1 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
          {categories.map((category) => (
            <label
              key={category.id}
              className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-all duration-150 ease-in-out
          ${
            selectedCategory === category.id
              ? "bg-red-100 text-red-600 font-semibold"
              : "hover:bg-gray-100 text-gray-700"
          }`}
            >
              <input
                type="checkbox"
                name="category"
                value={category.id}
                checked={selectedCategory === category.id}
                onChange={() => handleCategorySelect(category.id)}
                className="form-radio text-red-500"
              />
              <span className="text-sm truncate">{category.name}</span>
            </label>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Search;

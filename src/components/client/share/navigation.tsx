"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Fingerprint, MenuIcon, Search } from "lucide-react";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CircleUserRound,
  CreditCard,
  House,
  LogOut,
  Settings,
  Sparkles,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { useCurrentAccountContext } from "@/context/current_account_context";
import { getToken, removeToken } from "@/actions/server/token_store";
import {
  FetchServerGetApiNoToken,
  FetchServerPostApi,
} from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import { useLoadingContext } from "@/context/loading_context";
import { LoaderIcon } from "@/components/share/loading-icon";
type CourseType = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  createdAt: string;
};
const Navigation = () => {
  const { currentAccount, fetchGetCurrentAccount } = useCurrentAccountContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { startLoadingSpiner, stopLoadingSpiner } = useLoadingContext();
  const [suggestions, setSuggestions] = useState<CourseType[]>([]);
  const [page, setPage] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [keyword, setKeyword] = useState("");
  const [shouldSyncKeyword, setShouldSyncKeyword] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  // Lấy keyword từ URL để khởi tạo input
  // const [keyword, setKeyword] = useState(
  //   () => searchParams.get("keyword") || ""
  // );

  useEffect(() => {
    if (!keyword.trim()) {
      setSuggestions([]);
      setHasSearched(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsSearching(true);
      setHasSearched(false);
      try {
        const res = await FetchServerGetApiNoToken(
          API.COURSE.COURSE_FILTER +
            `?keyword=${encodeURIComponent(keyword.trim())}&page=0&size=4`
        );

        if (res && res.status === 200) {
          // console.log("Search suggestions:", res);
          setSuggestions(res.result || []);
          setPage(res.totalPages || 0);
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.error("API error:", err);
        setSuggestions([]);
      }
      setIsSearching(false);
      setHasSearched(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [keyword]);

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

  // Đồng bộ khi URL thay đổi (nếu bạn muốn input tự cập nhật theo URL)
  useEffect(() => {
    if (keyword.trim()) {
      setShowSuggestions(true); // ✅ Chỉ bật lại khi có gõ gì mới
    }
  }, [keyword]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("keyword", keyword.trim());
    params.set("page", "0");
    setShouldSyncKeyword(false); // ⛔ ngắt đồng bộ input từ URL
    setKeyword(""); // ✅ reset input
    setSuggestions([]);
    router.push(`/search?${params.toString()}`);
  };

  const handleLogout = async () => {
    startLoadingSpiner();
    const req: RefreshTokenRequest = {
      refreshToken: await getToken("refresh_token"),
    };
    const data = await FetchServerPostApi(
      API.REFRESH_TOKEN.DELETE_REFRESH_TOKEN,
      req
    );
    if (data && data.status === 200) {
      await removeToken("access_token");
      await removeToken("refresh_token");
      await fetchGetCurrentAccount();
      router.push("/login");
    } else {
      await removeToken("access_token");
      await removeToken("refresh_token");
      await fetchGetCurrentAccount();
      router.push("/login");
    }
    stopLoadingSpiner();
  };

  // Khi nhấn Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    startLoadingSpiner();

    if (e.key === "Enter") {
      updateUrlKeyword();
    }
    stopLoadingSpiner();

  };

  // Cập nhật URL với keyword mới
  const updateUrlKeyword = () => {
    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.set("keyword", keyword.trim());
    }

    params.set("page", "0");

    router.push(`/search?${params.toString()}`);

    setKeyword(""); // Xoá input
    setShowSuggestions(false); // Ẩn hẳn
    setSuggestions([]); // Ẩn gợi ý
  };

  return (
    <>
      <section className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm py-2 pl-[20px] pr-[20px]">
        <div className="container">
          <nav className="flex items-center justify-between ">
            <Link href="/" className="flex items-center gap-2 ">
              <img
                src="https://res.cloudinary.com/moment-images/logo_demo1_xzxrxd"
                className=" rounded-[100px] h-[50px] w-[50px]"
                alt="Logo"
              />
              <span className="text-lg font-semibold tracking-tighter">
                Khóa học
              </span>
            </Link>

            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" className={navigationMenuTriggerStyle()}>
                    Trang chủ
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    Danh mục khóa học
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] grid-cols-2 p-3">
                      {categories.map((category, index) => (
                        <Link
                          href={`/search?category=${category.id}&page=0&size=12`}
                          key={index}
                          className="rounded-md p-3 transition-colors hover:bg-muted/70"
                        >
                          <div key={category.id}>
                            <p className="mb-1 font-semibold text-foreground">
                              {category.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {category.detail}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    href="/contact"
                    className={navigationMenuTriggerStyle()}
                  >
                    Liên hệ
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="hidden items-center gap-4 lg:flex">
              <div className="relative max-w-xl mx-auto">
                <div className="flex items-center border rounded-md px-2 shadow-sm">
                  <Search
                    className="mr-2 text-gray-500"
                    onClick={updateUrlKeyword}
                  />
                  <Input
                    type="text"
                    placeholder="Tìm kiếm khóa học..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full border-none focus:ring-0"
                    onKeyDown={handleKeyDown}
                  />
                </div>

                {showSuggestions && keyword.trim() && (
                  <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md mt-1 z-50 max-h-60 overflow-y-auto border">
                    {isSearching ? (
                      <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500">
                        <LoaderIcon className="animate-spin size-4" />
                        Đang tìm kiếm...
                      </div>
                    ) : suggestions.length > 0 ? (
                      <>
                        {suggestions.slice(0, 4).map((course) => (
                          <div
                            key={course.id}
                            className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 cursor-default"
                          >
                            <img
                              src={course.imageUrl}
                              alt={course.name}
                              className="w-10 h-10 rounded object-cover"
                            />
                            <span className="font-bold text-sm w-4/5 truncate">
                              {course.name}
                            </span>
                          </div>
                        ))}
                        {page > 1 && (
                          <div
                            className="px-4 py-2 text-sm text-red-500 hover:underline cursor-pointer"
                            onClick={updateUrlKeyword}
                          >
                            Xem thêm...
                          </div>
                        )}
                      </>
                    ) : hasSearched ? (
                      <div className="px-4 py-2 text-sm text-gray-500 italic">
                        Không có kết quả tìm kiếm
                      </div>
                    ) : null}
                  </div>
                )}
              </div>

              <Popover>
                {currentAccount == null ? (
                  <>
                    <Link href={"/login"}>
                      <Button className="bg-[#FE4444] hover:bg-[#F87171]">
                        {" "}
                        Đăng nhập{" "}
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <PopoverTrigger asChild>
                      <img
                        src={currentAccount.avatarUrl}
                        className=" rounded-[100px] h-[45px] w-[45px] cursor-pointer"
                        alt="Avatar"
                      />
                    </PopoverTrigger>

                    <PopoverContent className="mr-[20px]">
                      <div className="flex items-center cursor-pointer">
                        <img
                          src={currentAccount.avatarUrl}
                          className=" rounded-[100px] h-[45px] w-[45px]"
                          alt="Avatar"
                        />
                        <div className="ml-[10px] flex flex-col justify-center truncate ">
                          <span>{currentAccount.name}</span>
                          <span className="truncate">
                            {currentAccount.email}
                          </span>
                        </div>
                      </div>

                      <DropdownMenuSeparator className="mt-[20px] bg-gray-200 h-[1px]" />
                      <div className=" flex flex-col gap-2">
                        {currentAccount.role === "ADMIN" && (
                          <Link href={"/admin"}>
                            <div className="mt-[10px] dropdown-item-custom">
                              <Fingerprint className="mr-[15px]" />
                              Admin
                            </div>
                          </Link>
                        )}

                        <Link href={"/profile"}>
                          <div className="dropdown-item-custom">
                            <CircleUserRound className="mr-[15px]" /> Trang cá
                            nhân
                          </div>
                        </Link>
                        <Link href={"/setting"}>
                          <div className="dropdown-item-custom">
                            <Settings className="mr-[15px]" /> Cài đặt
                          </div>
                        </Link>

                        <div className=" bg-gray-200 h-[1px]" />
                        <div
                          className="dropdown-item-custom"
                          onClick={() => handleLogout()}
                        >
                          <LogOut className="mr-[15px]" /> Đăng xuất
                        </div>
                      </div>
                    </PopoverContent>
                  </>
                )}
              </Popover>
            </div>

            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
                  <MenuIcon className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="max-h-screen overflow-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a
                      href="https://www.shadcnblocks.com"
                      className="flex items-center gap-2"
                    >
                      <img
                        src="https://res.cloudinary.com/moment-images/logo_demo1_xzxrxd"
                        className=" rounded-[100px] h-[50px] w-[50px]"
                        alt="Logo"
                      />
                      <span className="text-lg font-semibold tracking-tighter">
                        Khóa học
                      </span>
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col p-4">
                  {currentAccount != null && (
                    <>
                      <Accordion
                        type="single"
                        collapsible
                        className="mt-1 mb-2"
                      >
                        <AccordionItem
                          value="solutions"
                          className="border-none"
                        >
                          <AccordionTrigger className="text-base hover:no-underline">
                            <div className="flex items-center">
                              <img
                                src={currentAccount.avatarUrl}
                                className=" rounded-[100px] h-[45px] w-[45px]"
                                alt="Avatar"
                              />
                              <div className="ml-[10px] flex flex-col justify-center ">
                                <span>{currentAccount.name}</span>
                                <span>{currentAccount.email}</span>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="grid md:grid-cols-2">
                              {currentAccount.role === "ADMIN" && (
                                <Link
                                  href={"/admin"}
                                  className="rounded-md p-3 transition-colors hover:bg-muted/70"
                                >
                                  <div className="flex">
                                    <Fingerprint className="mr-[15px]" />
                                    <p className="mb-1 font-semibold text-foreground">
                                      Admin
                                    </p>
                                  </div>
                                </Link>
                              )}

                              <Link
                                href={"/"}
                                className="rounded-md p-3 transition-colors hover:bg-muted/70"
                              >
                                <div className="flex">
                                  <CircleUserRound className="mr-[15px]" />
                                  <p className="mb-1 font-semibold text-foreground">
                                    Trang cá nhân
                                  </p>
                                </div>
                              </Link>

                              <Link
                                href={"/"}
                                className="rounded-md p-3 transition-colors hover:bg-muted/70"
                              >
                                <div className="flex">
                                  <Settings className="mr-[15px]" />
                                  <p className="mb-1 font-semibold text-foreground">
                                    Cài đặt
                                  </p>
                                </div>
                              </Link>
                              <div
                                className="rounded-md p-3 transition-colors hover:bg-muted/70"
                                onClick={() => {
                                  handleLogout();
                                }}
                              >
                                <div className="flex">
                                  <LogOut className="mr-[15px]" />
                                  <p className="mb-1 font-semibold text-foreground">
                                    Đăng xuất
                                  </p>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </>
                  )}

                  <div className="flex flex-col gap-6">
                    <div className="relative max-w-xl mx-auto">
                      <div className="flex items-center border rounded-md px-2 shadow-sm">
                        <Search
                          className="mr-2 text-gray-500"
                          onClick={updateUrlKeyword}
                        />
                        <Input
                          type="text"
                          placeholder="Tìm kiếm khóa học..."
                          value={keyword}
                          onChange={(e) => setKeyword(e.target.value)}
                          className="w-full border-none focus:ring-0"
                          onKeyDown={handleKeyDown}
                        />
                      </div>

                      {showSuggestions && keyword.trim() && (
                        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md mt-1 z-50 max-h-60 overflow-y-auto border">
                          {isSearching ? (
                            <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500">
                              <LoaderIcon className="animate-spin size-4" />
                              Đang tìm kiếm...
                            </div>
                          ) : suggestions.length > 0 ? (
                            <>
                              {suggestions.slice(0, 4).map((course) => (
                                <div
                                  key={course.id}
                                  className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 cursor-default"
                                >
                                  <img
                                    src={course.imageUrl}
                                    alt={course.name}
                                    className="w-10 h-10 rounded object-cover"
                                  />
                                  <span className="font-bold text-sm w-4/5 truncate">
                                    {course.name}
                                  </span>
                                </div>
                              ))}
                              {page > 1 && (
                                <div
                                  className="px-4 py-2 text-sm text-red-500 hover:underline cursor-pointer"
                                  onClick={updateUrlKeyword}
                                >
                                  Xem thêm...
                                </div>
                              )}
                            </>
                          ) : hasSearched ? (
                            <div className="px-4 py-2 text-sm text-gray-500 italic">
                              Không có kết quả tìm kiếm
                            </div>
                          ) : null}
                        </div>
                      )}
                    </div>

                    <Link href="/" className="font-medium">
                      Trang chủ
                    </Link>
                  </div>

                  <Accordion type="single" collapsible className="mt-4 mb-2">
                    <AccordionItem value="solutions" className="border-none">
                      <AccordionTrigger className="text-base hover:no-underline">
                        Danh mục khóa học
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid md:grid-cols-2">
                          {categories.map((category, index) => (
                            <Link
                              href={`/search/category/${category.id}?page=1&size=10`}
                              key={index}
                              className="rounded-md p-3 transition-colors hover:bg-muted/70"
                            >
                              <div key={category.id}>
                                <p className="mb-1 font-semibold text-foreground">
                                  {category.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {category.detail}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="flex flex-col gap-6">
                    <Link href="/contact" className="font-medium">
                      Liên hệ
                    </Link>
                  </div>

                  {currentAccount === null && (
                    <>
                      <div className="mt-6 flex flex-col gap-4">
                        <Link href={"/login"}>
                          <Button className="bg-[#FE4444] hover:bg-[#F87171] w-full">
                            {" "}
                            Đăng nhập{" "}
                          </Button>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </section>
      <div className="h-[68px]" />
    </>
  );
};

export { Navigation };

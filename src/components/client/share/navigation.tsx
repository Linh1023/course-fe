"use client";

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
} from "@/components/ui/popover"
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { useCurrentAccountContext } from "@/context/current_account_context";
import { getToken, removeToken } from "@/actions/server/token_store";
import { FetchServerGetApiNoToken, FetchServerPostApi } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import { useRouter } from "next/navigation";
import { useLoadingContext } from "@/context/loading_context";
import { useEffect, useState } from "react";




const Navigation = () => {

    const { currentAccount, fetchGetCurrentAccount } = useCurrentAccountContext()
    const router = useRouter()
    const { startLoadingSpiner, stopLoadingSpiner } = useLoadingContext()
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategory = async () => {
            const res = await FetchServerGetApiNoToken(API.CATEGORY.ROOT );
            if (res && res.status === 200) {
                // Handle successful response
                // console.log("Categories fetched successfully:", res.result);
                setCategories(res.result);
            } else {
                // Handle error response
                console.error("Failed to fetch categories:", res);
            }
        }

        fetchCategory();
    },[])
 
    

    const handleLogout = async () => {
        startLoadingSpiner()
        const req: RefreshTokenRequest = {
            refreshToken: await getToken("refresh_token")
        }
        const data = await FetchServerPostApi(API.REFRESH_TOKEN.DELETE_REFRESH_TOKEN, req)
        if (data && data.status === 200) {
            await removeToken("access_token")
            await removeToken("refresh_token")
            await fetchGetCurrentAccount()
            router.push("/login")
        } else {
            await removeToken("access_token")
            await removeToken("refresh_token")
            await fetchGetCurrentAccount()
            router.push("/login")
        }
    }

    return (
        <>
            <section className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm py-2 pl-[20px]  pr-[20px]">
                <div className="container">
                    <nav className="flex items-center justify-between ">
                        <Link
                            href="/"
                            className="flex items-center gap-2 "
                        >
                            <img
                                src="https://res.cloudinary.com/moment-images/logo_demo1_xzxrxd"
                                className=" rounded-[100px] h-[50px] w-[50px]"
                                alt="Shadcn UI Navbar"
                            />
                            <span className="text-lg font-semibold tracking-tighter">
                                Khóa học
                            </span>
                        </Link>
                        <NavigationMenu className="hidden lg:block">
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <Link
                                        href="/"
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        Trang chủ
                                    </Link>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Danh mục khóa học</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="grid w-[600px] grid-cols-2 p-3">
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
                            <div className="flex items-center" >
                                <Search className="mr-[15px]" />
                                <Input type="text" placeholder="Tìm kiếm khóa học" className="w-[300px]"></Input>
                            </div>

                            <Popover>

                                {currentAccount == null ? (<>
                                    <Link href={"/login"}>
                                        <Button className="bg-[#FE4444] hover:bg-[#F87171]"> Đăng nhập </Button>
                                    </Link>

                                </>) : (<>
                                    <PopoverTrigger asChild>
                                        <img
                                            src={currentAccount.avatarUrl}
                                            className=" rounded-[100px] h-[45px] w-[45px] cursor-pointer"
                                            alt="Shadcn UI Navbar"
                                        />
                                    </PopoverTrigger>

                                    <PopoverContent className="mr-[20px]">

                                        <div className="flex items-center cursor-pointer">
                                            <img
                                                src={currentAccount.avatarUrl}
                                                className=" rounded-[100px] h-[45px] w-[45px]"
                                                alt="Shadcn UI Navbar"
                                            />
                                            <div className="ml-[10px] flex flex-col justify-center ">
                                                <span>{currentAccount.name}</span>
                                                <span>{currentAccount.email}</span>
                                            </div>

                                        </div>
                                        <DropdownMenuSeparator className="mt-[20px] bg-gray-200 h-[1px]" />
                                        <div className=" flex flex-col gap-2">
                                            {currentAccount.role === "ADMIN" && (<>
                                                <Link href={"/admin"}>
                                                    <div className="mt-[10px] dropdown-item-custom">
                                                        <Fingerprint className="mr-[15px]" />
                                                        Admin</div>
                                                </Link>
                                            </>)}

                                            <div className="dropdown-item-custom" >
                                                <CircleUserRound className="mr-[15px]" />  Trang cá nhân
                                            </div>
                                            <div className="dropdown-item-custom" >
                                                <Settings className="mr-[15px]" />
                                                Cài đặt</div>
                                            <div className=" bg-gray-200 h-[1px]" />
                                            <div className="dropdown-item-custom"
                                                onClick={() => { handleLogout() }}
                                            >
                                                <LogOut className="mr-[15px]" />
                                                Đăng xuất</div>
                                        </div>


                                    </PopoverContent>

                                </>)}



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
                                                alt="Shadcn UI Navbar"
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
                                            <Accordion type="single" collapsible className="mt-1 mb-2">
                                                <AccordionItem value="solutions" className="border-none">
                                                    <AccordionTrigger className="text-base hover:no-underline">
                                                        <div className="flex items-center">
                                                            <img
                                                                src={currentAccount.avatarUrl}
                                                                className=" rounded-[100px] h-[45px] w-[45px]"
                                                                alt="Shadcn UI Navbar"
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
                                                                <>
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

                                                                </>
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
                                                                onClick={() => { handleLogout() }}
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

                                        <div className="flex items-center" >
                                            <Search className="mr-[15px]" />
                                            <Input type="text" placeholder="Tìm kiếm khóa học"></Input>
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
                                                    <Button className="bg-[#FE4444] hover:bg-[#F87171] w-full"> Đăng nhập </Button>
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
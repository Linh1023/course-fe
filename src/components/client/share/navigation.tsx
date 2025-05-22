"use client";

import { MenuIcon } from "lucide-react";

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


const Navigation = () => {
    const features = [
        {
            title: "Dashboard",
            description: "Overview of your activity",
            href: "#",
        },
        {
            title: "Analytics",
            description: "Track your performance",
            href: "#",
        },
        {
            title: "Settings",
            description: "Configure your preferences",
            href: "#",
        },
        {
            title: "Integrations",
            description: "Connect with other tools",
            href: "#",
        },
        {
            title: "Storage",
            description: "Manage your files",
            href: "#",
        },
        {
            title: "Support",
            description: "Get help when needed",
            href: "#",
        },
    ];

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
                                            {features.map((feature, index) => (
                                                <NavigationMenuLink
                                                    href={feature.href}
                                                    key={index}
                                                    className="rounded-md p-3 transition-colors hover:bg-muted/70"
                                                >
                                                    <div key={feature.title}>
                                                        <p className="mb-1 font-semibold text-foreground">
                                                            {feature.title}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {feature.description}
                                                        </p>
                                                    </div>
                                                </NavigationMenuLink>
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
                            <Input type="text" placeholder="Tìm kiếm khóa học" className="w-[300px]"></Input>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <img
                                        src="https://res.cloudinary.com/moment-images/1_2_r15hh3"
                                        className=" rounded-[100px] h-[45px] w-[45px] cursor-pointer"
                                        alt="Shadcn UI Navbar"
                                    />
                                </PopoverTrigger>
                                <PopoverContent className="mr-[20px]">
                                    <div className="flex items-center">
                                        <img
                                            src="https://res.cloudinary.com/moment-images/1_2_r15hh3"
                                            className=" rounded-[100px] h-[45px] w-[45px]"
                                            alt="Shadcn UI Navbar"
                                        />
                                        <div className="ml-[10px] flex flex-col justify-center ">
                                            <span>Lê Ngọc Dương</span>
                                            <span>duongngocle@gmail.com</span>
                                        </div>

                                    </div>
                                    <DropdownMenuSeparator className="mt-[20px] bg-gray-200 h-[1px]" />
                                    <div className=" flex flex-col gap-2">
                                        <div className="mt-[10px] dropdown-item-custom">Trang cá nhân</div>
                                        <div className="dropdown-item-custom" >Cài đặt</div>
                                        <div className=" bg-gray-200 h-[1px]" />
                                        <div className="dropdown-item-custom">Đăng xuất</div>
                                    </div>
                                </PopoverContent>
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

                                    <div className="flex flex-col gap-6">
                                        <Input type="text" placeholder="Tìm kiếm khóa học"></Input>
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
                                                    {features.map((feature, index) => (
                                                        <a
                                                            href={feature.href}
                                                            key={index}
                                                            className="rounded-md p-3 transition-colors hover:bg-muted/70"
                                                        >
                                                            <div key={feature.title}>
                                                                <p className="mb-1 font-semibold text-foreground">
                                                                    {feature.title}
                                                                </p>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {feature.description}
                                                                </p>
                                                            </div>
                                                        </a>
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


                                    <div className="mt-6 flex flex-col gap-4">

                                        <Button className="bg-red-500 hover:bg-red-400" >Đăng nhập</Button>

                                    </div>
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
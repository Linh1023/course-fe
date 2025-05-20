"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import ListItem from "./list_item"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export default function Navbar() {

    const pathName= usePathname()

    const components: { name: string; link: string; }[] = [
        {
            name: "Alert Dialog",
            link: "/docs/primitives/alert-dialog",

        },
        {
            name: "Hover Card",
            link: "/docs/primitives/hover-card",

        },
        {
            name: "Progress",
            link: "/docs/primitives/progress",

        },
        {
            name: "Scroll-area",
            link: "/docs/primitives/scroll-area",

        },
        {
            name: "Tabs",
            link: "/docs/primitives/tabs",

        },
        {
            name: "Tooltip",
            link: "/docs/primitives/tooltip",
        },
        {
            name: "Tooltip",
            link: "/docs/primitives/tooltip",
        },
        {
            name: "Tooltip",
            link: "/docs/primitives/tooltip",
        },
        {
            name: "Tooltip",
            link: "/docs/primitives/tooltip",
        },
        {
            name: "Tooltip",
            link: "/docs/primitives/tooltip",
        },
        {
            name: "Tooltip",
            link: "/docs/primitives/tooltip",
        },
    ]

    if (pathName === "/login") {
        return(<></>)
    }


    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
                <div className="bg-gray-200 backdrop-blur-sm rounded-b-[30px] px-6 mb-2 shadow-sm ">
                    <div className="flex items-center justify-between h-[70px] ">
                        {/* Logo */}
                        <div className="flex-shrink-0 mr-8">
                            <Link href="/" className="flex items-center">

                                <img
                                    src="https://res.cloudinary.com/moment-images/logo_demo1_xzxrxd"
                                    alt="Image"
                                    className="h-[55px] w-[55px] rounded-[100px]"

                                />

                                <span className="ml-[10px] font-bold  text-[25px] ">Company</span>
                            </Link>
                        </div>

                        {/* Navigation */}
                        <nav className="flex items-center space-x-8">
                            {/* Products Dropdown */}

                            <Link href="#" className="text-gray-900 text-[17px]">
                                Trang chủ
                            </Link>
                            <div className="relative">

                                <NavigationMenu>
                                    <NavigationMenuList >
                                        <NavigationMenuItem >
                                            <NavigationMenuTrigger
                                                className="!bg-gray-200/80"
                                            >
                                                <span className="text-gray-900 font-normal text-[17px]" >Danh mục khóa học</span>
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent  >
                                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-gray-200">
                                                    {components.map((component, index) => (
                                                        <ListItem
                                                            key={index}
                                                            name={component.name}
                                                            link={component.link}
                                                        >
                                                        </ListItem>
                                                    ))}
                                                </ul>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>
                                    </NavigationMenuList>
                                </NavigationMenu>


                            </div>

                        </nav>

                        <Input type="text" placeholder="Tìm kiếm khóa học" className=" bg-white ml-[100px] mr-[20px] w-[200px] "/>

                        {/* Login Button */}
                        <Button className="bg-red-500 hover:bg-red-400">
                            Đăng nhập
                        </Button>
                      
                    </div>
                </div>

            </header>
            <div className="h-[80px]" />
        </>


    )
}


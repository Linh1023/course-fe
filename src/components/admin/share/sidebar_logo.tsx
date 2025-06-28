"use client"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function SidebarLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild className="h-12">
          <Link href={"/admin"} className="flex items-center ps-2.5 ">
            <img
              src="https://res.cloudinary.com/moment-images/logo_demo1_xzxrxd"
              className="h-[40px] w-[40px] rounded-[100px]"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Quản lý
            </span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

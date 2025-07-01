"use client";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle,
  ClipboardList,
  FileText,
  Home,
  Inbox,
  List,
  MessageCircle,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";

export const SidebarNav = () => {
  const items = [
    {
      title: "Trang chủ",
      url: "/admin?page=1&perPage=10",
      icon: Home,
    },
    {
      title: "Danh mục",
      url: "/admin/category?page=1&perPage=10",
      icon: List,
    },
    {
      title: "Bình luận",
      url: "/admin/comment?page=1&perPage=10",
      icon: MessageCircle,
    },
    {
      title: "Khóa học",
      url: "/admin/course?page=1&perPage=10",
      icon: BookOpen,
    },
    {
      title: "Đăng ký khóa học",
      url: "/admin/course_enrollment?page=1&perPage=10",
      icon: ClipboardList,
    },
    {
      title: "Bài nộp",
      url: "/admin/submission?page=1&perPage=10",
      icon: Inbox,
    },
    {
      title: "Người dùng",
      url: "/admin/user?page=1&perPage=10",
      icon: Users,
    },
  ];
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
  };
  const pathname = usePathname();
  return (
    <SidebarGroup  >
      <SidebarGroupContent >
        <SidebarMenu >
          {items.map((item) => {
            const isActive = pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild >
                  <Link
                    href={item.url}
                    title={item.title}
                    className={
                      `flex items-center gap-2 p-2 hover:border-destructive hover:text-white active:text-white` +
                      (isActive ? " bg-sidebar-accent text-white  " : "")
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="truncate">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

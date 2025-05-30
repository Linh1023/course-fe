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

export const SidebarNav = () => {
  const items = [
    {
      title: "Trang chủ",
      url: "/admin",
      icon: Home,
    },
    {
      title: "Danh mục",
      url: "/admin/category",
      icon: List,
    },
    {
      title: "Bình luận",
      url: "/admin/comment",
      icon: MessageCircle,
    },
    {
      title: "Khóa học",
      url: "/admin/course",
      icon: BookOpen,
    },
    {
      title: "Đăng ký khóa học",
      url: "/admin/course_enrollment",
      icon: ClipboardList,
    },
    {
      title: "Bài học",
      url: "/admin/lesson",
      icon: FileText,
    },
    {
      title: "Tiến độ bài học",
      url: "/admin/lesson_progress",
      icon: CheckCircle,
    },
    {
      title: "Bài nộp",
      url: "/admin/submission",
      icon: Inbox,
    },
    {
      title: "Người dùng",
      url: "/admin/user",
      icon: Users,
    },
    {
      title: "Cài đặt",
      url: "/admin/settings",
      icon: Settings,
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
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
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

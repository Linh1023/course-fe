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
      title: "Home",
      url: "/admin",
      icon: Home,
    },
    {
      title: "Danh mục",
      url: "/admin/category",
      icon: List,
    },
    {
      title: "Comment",
      url: "/admin/comment",
      icon: MessageCircle,
    },
    {
      title: "Khóa học",
      url: "/admin/course",
      icon: BookOpen,
    },
    {
      title: "Enrollment",
      url: "/admin/course_enrollment",
      icon: ClipboardList,
    },
    {
      title: "Lesson",
      url: "/admin/lesson",
      icon: FileText,
    },
    {
      title: "Progress",
      url: "/admin/lesson_progress",
      icon: CheckCircle,
    },
    {
      title: "Submission",
      url: "/admin/submission",
      icon: Inbox,
    },
    {
      title: "User",
      url: "/admin/user",
      icon: Users,
    },
    {
      title: "Settings",
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
                <SidebarMenuButton asChild size={"lg"}>
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

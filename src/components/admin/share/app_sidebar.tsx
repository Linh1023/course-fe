"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { SidebarLogo } from "./sidebar_logo";
import { SidebarNav } from "./sidebar_nav";
import { SidebarUser } from "./sidebar_user";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Menu items.

export function AppSidebar() {
  const pathname = usePathname();
  const [open,setOpen] = useState(false);

  return (
    <Sidebar  side="left" className="w-64" variant="floating" collapsible="icon">
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
    </Sidebar>
  );
}

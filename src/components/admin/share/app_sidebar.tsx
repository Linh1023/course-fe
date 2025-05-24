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

// Menu items.

export function AppSidebar() {
  return (
    <Sidebar side="left" className="w-64" variant="floating" collapsible="icon">
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

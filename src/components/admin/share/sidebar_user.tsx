"use client";

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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useCurrentAccountContext } from "@/context/current_account_context";
import Link from "next/link";
import { getToken, removeToken } from "@/actions/server/token_store";
import { FetchServerPostApi } from "@/actions/server/fetch_server_api";
import API from "@/api/api";
import { useRouter } from "next/navigation";

const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};
export const SidebarUser = () => {
  const { isMobile } = useSidebar();
  const { currentAccount, fetchGetCurrentAccount } = useCurrentAccountContext()
  const router = useRouter()

      const handleLogout = async () => {
          const req: RefreshTokenRequest = {
              refreshToken: await getToken("refresh_token")
          }
          const data = await FetchServerPostApi(API.REFRESH_TOKEN.DELETE_REFRESH_TOKEN, req)
          if (data && data.status === 200) {
              await removeToken("access_token")
              await removeToken("refresh_token")
              await fetchGetCurrentAccount()
              router.push("/login")
          }
      }
  

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-4 w-4 rounded-lg">
                <AvatarImage src={currentAccount?.avatarUrl} alt={currentAccount?.name} />
              
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{currentAccount?.name}</span>
                <span className="truncate text-xs">{currentAccount?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal cursor-pointer">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={currentAccount?.avatarUrl} alt={currentAccount?.name} />
                
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{currentAccount?.name}</span>
                  <span className="truncate text-xs">{currentAccount?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>


            <DropdownMenuSeparator />
            <DropdownMenuGroup >
              <Link href={"/"}>
                <DropdownMenuItem className="cursor-pointer">
                  <House />
                  Trang chủ
                </DropdownMenuItem>
              </Link>

            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
               <CircleUserRound />
                Thông tin cá nhân
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings />
                Cài đặt
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            
            
            <DropdownMenuItem className="cursor-pointer"
            onClick={() => {handleLogout()}}
            >
              <LogOut />
              Đăng xuất
            </DropdownMenuItem>
          
          
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

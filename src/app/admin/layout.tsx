import { AppSidebar } from "@/components/admin/share/app_sidebar";
import { BreadcrumbHeader } from "@/components/admin/share/breadcrumb";
import { ModeToggle } from "@/components/admin/share/mode_toggle";
import { ThemeProvider } from "@/components/admin/share/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <AppSidebar />
        <main className="relative flex w-full flex-1 flex-col bg-background ">
          <header className="flex h-16 shrink-0 items-center gap-2 ">
            <div className="flex items-center gap-2 p-4">
              <SidebarTrigger />
              <div className="shrink-0 bg-border w-[1px] mr-2 h-4"></div>
              <ModeToggle />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}

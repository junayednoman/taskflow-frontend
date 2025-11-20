"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { LayoutDashboard, LogOut } from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { navItems } from "@/data/nav.data";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { logOut } from "@/redux/slice/authSlice";
import { toast } from "sonner";

export function NavMain() {
  const isActive = (url: string) => pathname === url;
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    dispatch(logOut());
    router.push(`/auth/login?redirect=${pathname}`);
    toast.success("Logged out successfully!");
  };

  return (
    <SidebarGroup className="mainNav">
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              asChild // Render the Link as the button content
              tooltip="Dashboard"
              className={`text-[15px] py-6 px-4 cursor-pointer min-w-8 duration-200 ease-linear ${
                isActive("/dashboard")
                  ? "bg-primary text-background hover:bg-primary/90"
                  : "hover:bg-muted"
              }`}
            >
              <Link
                href="/dashboard"
                className="flex items-center gap-2 w-full"
              >
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild // Render the Link as the button content
                className={`text-[15px] py-6 px-4 cursor-pointer ${
                  isActive(item.url)
                    ? "bg-primary text-background hover:bg-primary/90"
                    : "hover:bg-muted"
                }`}
                tooltip={item.title}
              >
                <Link
                  href={item.url}
                  className="flex items-center gap-2 w-full"
                >
                  {item.icon && (item?.icon as any)}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <Separator />
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              onClick={handleLogout}
              tooltip="Logout"
              className="text-[15px] py-6 px-4 cursor-pointer hover:bg-transparent active:bg-transparent"
            >
              <button className="flex items-center gap-2 text-destructive cursor-pointer">
                <LogOut size={19} />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <button className="flex items-center py-3 px-4 gap-2 text-destructive text-[15px] cursor-pointer"></button>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

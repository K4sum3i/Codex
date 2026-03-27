import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Project, User } from "@/lib/generated/prisma/client";
import React from "react";
import NavMain from "./nav-main";
import { data } from "@/lib/constants";
import RecentOpen from "./recent-open";
import NavFooter from "./nav-footer";

export default function AppSidebar({
  recentProjects,
  user,
  ...props
}: {
  recentProjects: Project[];
} & { user: User } & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="w-[265px] bg-sidebar flex flex-col justify-between pt-5 px-4 pb-4 gap-5 shrink-0"
      {...props}
    >
      {/*     
      <SidebarContent className="px-2 mt-10 gap-y-6">
        <NavMain items={data.navMain} />
        <RecentOpen recentProjects={recentProjects} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter prismaUser={user} />
      </SidebarFooter> */}
      <SidebarHeader className="flex flex-col gap-5">
        <SidebarMenuButton className="flex items-center gap-[12px] py-[8px] px-[10px]">
          <Avatar>
            <AvatarImage src={""} alt={""} />
            <AvatarFallback>CX</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex flex-col gap-[2px]">
            <div className="text-sm font-bold text-foreground truncate">
              Codex
            </div>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <RecentOpen recentProjects={recentProjects} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter prismaUser={user} />
      </SidebarFooter>
    </Sidebar>
  );
}

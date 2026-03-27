import { getRecentProjects } from "@/actions/projects";
import { onAuthenticateUser } from "@/actions/user";
import AppSidebar from "@/components/global/add-sidebar/AppSidebar";
import UpperInfoBar from "@/components/global/upper-info-bar/upperInfoBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const recentProjects = await getRecentProjects();
  const checkUser = await onAuthenticateUser();

  if (!checkUser.user) redirect("/sign-in");

  return (
    <SidebarProvider>
      <AppSidebar
        user={checkUser.user}
        recentProjects={recentProjects.data || []}
        variant="inset"
      />
      <SidebarInset className="pt-4 px-4 pb-4">
        <div className="flex-1 rounded-lg p-5 flex flex-col gap-6 overflow-hidden">
          <UpperInfoBar user={checkUser.user} />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

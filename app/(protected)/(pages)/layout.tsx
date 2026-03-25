import { onAuthenticateUser } from "@/actions/user";
import { SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const checkUser = await onAuthenticateUser();
  if (!checkUser.user) redirect("/sign-in");

  /*   return <div>{children}</div>; */
  return (
    <SidebarProvider>
      <AppSidebar></AppSidebar>
    </SidebarProvider>
  );
}

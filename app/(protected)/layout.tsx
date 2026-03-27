export const dynamic = "force-dynamic";

import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await onAuthenticateUser();
  if (!auth.user) redirect("/sign-in");

  return (
    <div className="min-h-[812px] flex bg-background text-foreground text-sm leading-[1.4]">
      {children}
    </div>
  );
}

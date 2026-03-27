"use client";

import { Button } from "@/components/ui/button";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { User } from "@/lib/generated/prisma/client";
import { Show, UserButton, useUser } from "@clerk/nextjs";
import { ChevronsUpDown, Sparkles } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavFooter({ prismaUser }: { prismaUser: User }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!isLoaded || !isSignedIn) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex flex-col gap-3 group-data-[collapsible=icon]:hidden">
          {!prismaUser.subscription && (
            <div className="flex flex-col p-[14px] gap-[14px] rounded-lg bg-primary text-primary-foreground">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-zinc-700 flex items-center justify-center shrink-0">
                  <HugeiconsIcon icon={Sparkles} className="text-base" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-bold whitespace-nowrap">
                    Upgrade to Premium
                  </div>
                  <div className="text-xs">
                    Unlock all features including AI and more
                  </div>
                </div>
              </div>
              <Button variant="secondary" size={"lg"}>
                {loading ? <Spinner /> : "Upgrade"}
              </Button>
            </div>
          )}

          <Show when="signed-in">
            <SidebarMenuButton
              size={"lg"}
              className="flex w-full items-center gap-[14px] px-3 py-2 rounded-lg bg-[var(--card)] shadow-[inset_0_0_0_1px_var(--border)] min-w-0"
            >
              <UserButton />
              <div className="flex flex-col flex-1 gap-[2px] min-w-0 group-data-[collapsible=icon]:hidden">
                <span className="text-xs font-bold text-foreground truncate">
                  {user?.fullName}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {user?.emailAddresses[0]?.emailAddress}
                </span>
              </div>
              <div className="w-[18px] h-[18px] flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={ChevronsUpDown} size={16} />
              </div>
            </SidebarMenuButton>
          </Show>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

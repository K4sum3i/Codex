"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: IconSvgElement;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();
  return (
    <SidebarGroup className="flex flex-col gap-[6px]">
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              className={`${pathname.includes(item.url) && "bg-background-80"}`}
            >
              <Link
                href={item.url}
                className={`text-lg ${pathname.includes(item.url) && "font-bold"}`}
              >
                <div className="w-[18px] h-[18px] flex items-center justify-center shrink-0">
                  <HugeiconsIcon icon={item.icon} className="text-lg" />
                </div>
                <span className="truncate text-xs font-semibold">
                  {item.title}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

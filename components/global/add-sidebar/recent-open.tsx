"use client";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Project } from "@/lib/generated/prisma/client";
import { useSlideStore } from "@/store/useSlideStore";
import { JsonValue } from "@prisma/client/runtime/client";
import { useRouter } from "next/navigation";
import { sileo } from "sileo";

type Props = {
  recentProjects: Project[];
};

export default function RecentOpen({ recentProjects }: Props) {
  const router = useRouter();
  const { setSlides } = useSlideStore();
  const handleClick = (projectId: string, slides: JsonValue) => {
    if (!projectId || !slides) {
      sileo.error({
        title: "Project not found",
        description: "Please try again",
      });
      return;
    }

    setSlides(JSON.parse(JSON.stringify(slides)));
    router.push(`/presentation/${projectId}`);
  };

  return recentProjects.length > 0 ? (
    <SidebarGroup className="flex flex-col gap-[6px]">
      <SidebarGroupLabel className="text-xs text-muted-foreground pt-0 px-[10px] pb-[6px] whitespace-nowrap">
        Recently Opened
      </SidebarGroupLabel>
      <SidebarMenu className="bg-secondary rounded-lg p-3 flex flex-col gap-[10px]">
        <div className="text-sm font-bold text-foreground">
          Continue working
        </div>
        {recentProjects.length > 0
          ? recentProjects.map((item) => (
              <SidebarMenuItem
                key={item.id}
                className="flex flex-col gap-[6px]"
              >
                <SidebarMenuButton
                  asChild
                  className="flex items-center gap-[10px] py-2 px-[10px] rounded-md bg-card min-w-0"
                >
                  <Button
                    onClick={() => handleClick(item.id, item.slides)}
                    className="text-xs items-center justify-start"
                  >
                    <span className="text-sm font-semibold text-foreground truncate">
                      {item.title}
                    </span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
          : ""}
      </SidebarMenu>
    </SidebarGroup>
  ) : (
    ""
  );
}

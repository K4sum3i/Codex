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
    <SidebarGroup>
      <SidebarGroupLabel>Recently Opened</SidebarGroupLabel>
      <SidebarMenu>
        {recentProjects.length > 0
          ? recentProjects.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton asChild className="hover:bg-primary-80">
                  <Button
                    variant={"link"}
                    onClick={() => handleClick(item.id, item.slides)}
                    className="text-xs items-center justify-start"
                  >
                    <span>{item.title}</span>
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

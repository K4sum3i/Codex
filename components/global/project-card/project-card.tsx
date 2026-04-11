"use client";
import { itemVariants, themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { JsonValue } from "@prisma/client/runtime/client";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import ThumbnailPreview from "./thumbnail-preview";
import { timeAgo } from "@/lib/utils";
import AlertDialogBox from "../alert-dialog/alert-dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { sileo } from "sileo";
import { deleteProject, recoverProject } from "@/actions/projects";

type Props = {
  projectId: string;
  title: string;
  createdAt: string;
  isDelete?: boolean;
  slideData: JsonValue;
  themeName: string;
};
export default function ProjectCard({
  projectId,
  title,
  createdAt,
  isDelete,
  slideData,
  themeName,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { setSlides } = useSlideStore();
  const router = useRouter();
  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    router.push(`/presentation/${projectId}`);
  };

  const theme = themes.find((theme) => theme.name === themeName) || themes[0];

  const handleRecover = async () => {
    setLoading(true);
    if (!projectId) {
      sileo.error({
        title: "Error",
        description: "Project not found",
      });
      return;
    }

    try {
      const res = await recoverProject(projectId);

      if (res?.status !== 200) {
        sileo.error({
          title: "Oppse!",
          description: res?.error || "Something went wrong",
        });
        return;
      }
      setOpen(false);
      router.refresh();
      sileo.success({
        title: "Success",
        description: "Project recovered successfully",
      });
    } catch (error) {
      console.log(error);
      sileo.error({
        title: "Oppse!",
        description: "Something went wrong. Please contact support.",
      });
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    if (!projectId) {
      sileo.error({
        title: "Error",
        description: "Project not found",
      });
      return;
    }

    try {
      const res = await deleteProject(projectId);

      if (res?.status !== 200) {
        sileo.error({
          title: "Oppse!",
          description: res?.error || "Failed to delete the project",
        });
        return;
      }
      setOpen(false);
      router.refresh();
      sileo.success({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error) {
      console.log(error);
      sileo.error({
        title: "Oppse!",
        description: "Something went wrong. Please contact support.",
      });
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className={`bg-card shadow-[inset_0_0_0_1px_var(--border)] rounded-lg p-[14px] flex flex-col gap-[14px] min-w-0 ${!isDelete}`}
    >
      <div
        className="aspect-[16/10] rounded-md p-[14px] flex flex-col justify-between gap-3 overflow-hidden bg-card"
        onClick={handleNavigation}
      >
        <ThumbnailPreview theme={themes} />
      </div>
      <div className="w-full gap-3 min-w-0">
        <div className="flex flex-col min-w-0 gap-1">
          <h3 className="font-bold text-base text-foreground truncate">
            {title}
          </h3>
          <div className="flex w-full justify-between items-center gap-2">
            <p
              className="text-sm text-muted-foreground truncate"
              suppressHydrationWarning
            >
              {timeAgo(createdAt)}
            </p>
            {isDelete ? (
              <AlertDialogBox
                variant="default"
                description="This will recover your projects and restore your data."
                loading={loading}
                open={open}
                onClick={handleRecover}
                handleOpen={() => setOpen(!open)}
              >
                <Button size={"lg"} disabled={loading}>
                  Recover
                </Button>
              </AlertDialogBox>
            ) : (
              <AlertDialogBox
                description="This will delete your projects and restore your data."
                variant="destructive"
                loading={loading}
                open={open}
                onClick={handleDelete}
                handleOpen={() => setOpen(!open)}
              >
                <Button size={"lg"} disabled={loading}>
                  Delete
                </Button>
              </AlertDialogBox>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

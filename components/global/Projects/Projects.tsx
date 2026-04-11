"use client";

import { containerVariants } from "@/lib/constants";
import { Project } from "@/lib/generated/prisma/client";
import { motion } from "motion/react";
import ProjectCard from "../project-card/project-card";

type Props = {
  projects: Project[];
};

export default function Projects({ projects }: Props) {
  return (
    <motion.div
      className="gap-[14px]"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project, id) => (
        <ProjectCard
          key={id}
          projectId={project?.id}
          title={project?.title}
          createdAt={project?.createdAt.toString()}
          isDelete={project?.isDeleted}
          slideData={project?.slides}
          themeName={project?.themeName}
        />
      ))}
    </motion.div>
  );
}

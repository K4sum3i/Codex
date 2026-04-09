import { getAllProjects } from "@/actions/projects";
import NotFound from "@/components/global/not-found/not-found";
import ProjectCard from "@/components/global/project-card/project-card";
import Projects from "@/components/global/Projects/Projects";

export default async function DashboardPage() {
  const allProjects = await getAllProjects();
  return (
    <div className="flex flex-col gap-6 min-w-0 flex-1">
      <div className="flex flex-col gap-4 min-w-0 flex-1">
        <div className="flex items-center justify-between gap-4 min-w-0">
          <div className="flex flex-col gap-1 min-w-0">
            <h1 className="text-lg font-bold text-foreground whitespace-nowrap">
              Projects
            </h1>
            <p className="text-sm text-muted-foreground whitespace-nowrap">
              All of your work in one place
            </p>
          </div>
        </div>
        <ProjectCard />
        {/*         {allProjects.data && allProjects.data.length > 0 ? (
          <Projects projects={allProjects.data} />
        ) : (
          <NotFound />
        )} */}
      </div>
    </div>
  );
}

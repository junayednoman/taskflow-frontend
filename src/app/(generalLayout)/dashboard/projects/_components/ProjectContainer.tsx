"use client";
import AContainer from "@/components/AContainer";
import ProjectsTable from "./ProjectsTable";

const ProjectContainer = () => {

  return (
    <AContainer>
      <div className="space-y-3">
        <h3 className="text-3xl font-bold">Projects</h3>
        <p className="text-base text-card-foreground">
          All your projects — track, organize, manage like a boss.
        </p>
      </div>

      <ProjectsTable />
    </AContainer>
  );
};

export default ProjectContainer;

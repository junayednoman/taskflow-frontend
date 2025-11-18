"use client";
import AContainer from "@/components/AContainer";
import ProjectsTable from "./ProjectsTable";
import CreateProjectModal, { TCreateProject } from "./CreateProjectModal";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const ProjectContainer = () => {
  const [open, setOpen] = useState(false);

  const handleCreateTeam = (data: TCreateProject) => {
    toast.success("Project created successfully");
    setOpen(false);
    console.log("data, ", data);
  };

  return (
    <AContainer>
      <div className="space-y-3">
        <h3 className="text-3xl font-bold">Projects Dashboard</h3>
        <p className="text-base text-card-foreground">
          See all your projects in one place — track progress, team load, and
          what needs your attention.
        </p>
      </div>
      <div className="flex justify-end">
        <CreateProjectModal
          open={open}
          setOpen={setOpen}
          onCreate={handleCreateTeam}
        >
          <Button className="p-6">Create Project</Button>
        </CreateProjectModal>
      </div>
      <ProjectsTable />
    </AContainer>
  );
};

export default ProjectContainer;

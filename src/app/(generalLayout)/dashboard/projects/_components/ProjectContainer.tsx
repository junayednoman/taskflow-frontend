"use client";
import AContainer from "@/components/AContainer";
import ProjectsTable from "./ProjectsTable";
import CreateProjectModal, { TCreateProject } from "./CreateProjectModal";
import { useState } from "react";
import { useCreateProjectMutation } from "@/redux/api/projectApi";
import handleMutation from "@/utils/handleMutation";
import { Button } from "@/components/ui/button";

const ProjectContainer = () => {
  const [open, setOpen] = useState(false);

  const [createProject, { isLoading }] = useCreateProjectMutation();

  const handleCreateProject = async (data: TCreateProject) => {
    await handleMutation(
      data,
      createProject,
      "Creating project...",
      () => setOpen(false)
    );
  };

  return (
    <AContainer>
      <div className="space-y-3">
        <h3 className="text-3xl font-bold">Projects Dashboard</h3>
        <p className="text-base text-card-foreground">
          See all your projects in one place — track progress and workload.
        </p>
      </div>

      <div className="flex justify-end">
        <CreateProjectModal
          open={open}
          setOpen={setOpen}
          onCreate={handleCreateProject}
        >
          <Button disabled={isLoading} className="p-6">
            {isLoading ? "Creating..." : "Create Project"}
          </Button>
        </CreateProjectModal>
      </div>

      <ProjectsTable />
    </AContainer>
  );
};

export default ProjectContainer;

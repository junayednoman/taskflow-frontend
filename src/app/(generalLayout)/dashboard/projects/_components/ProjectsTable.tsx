"use client";

import { useState } from "react";
import { APagination } from "@/components/ui/APagination";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import EditProjectModal from "./EditProjectModal";
import { useGetProjectsQuery } from "@/redux/api/projectApi";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
import { TProject } from "../project.interface";
import { toast } from "sonner";
import { useCreateProjectMutation } from "@/redux/api/projectApi";
import { useGetTeamApisQuery } from "@/redux/api/teamApi";
import handleMutation from "@/utils/handleMutation";
import CreateProjectModal, { TCreateProject } from "./CreateProjectModal";
import { TTeam } from "../../teams/team.interface";

const ProjectsTable = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const params = { page, limit };

  const { data, isLoading, error, refetch } = useGetProjectsQuery(params);

  const projects = data?.data?.projects || [];
  const meta = data?.data?.meta;

  const [open, setOpen] = useState(false);

  const { data: teamData } = useGetTeamApisQuery("");
  const teams = teamData?.data?.map((t: TTeam) => ({
    label: t.name,
    value: t.id,
  }));

  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();

  const handleCreateProject = async (data: TCreateProject) => {
    const payload = {
      name: data.name,
      teamId: data.team,
    };

    await handleMutation(payload, createProject, "Creating project...", () => {
      toast.success("Project created successfully!");
      setOpen(false);
    });
  };

  if (isLoading)
    return <ASpinner className="flex justify-center items-center h-[60vh]" />;

  if (error)
    return (
      <AErrorMessage error={error} className="h-[60vh]" onRetry={refetch} />
    );

  return (
    <div>
      <div className="flex justify-end">
        <CreateProjectModal
          open={open}
          setOpen={setOpen}
          teams={teams}
          onCreate={handleCreateProject}
        >
          <Button className="p-6" disabled={isCreating}>
            {isCreating ? "Creating..." : "Create Project"}
          </Button>
        </CreateProjectModal>
      </div>
      <div className="space-y-8">
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white mt-4">
          <div className="grid grid-cols-12 bg-primary px-6 py-3 text-card font-semibold">
            <div className="col-span-4">Project Name</div>
            <div className="col-span-3">Team</div>
            <div className="col-span-3">Tasks</div>
            <div className="col-span-2 text-right">Action</div>
          </div>

          <div className="divide-y divide-border">
            {projects.length ? (
              projects.map((p: TProject) => (
                <div
                  key={p.id}
                  className="grid grid-cols-12 px-6 py-3 items-center hover:bg-accent transition-colors"
                >
                  <div className="col-span-4 font-medium">{p.name}</div>
                  <div className="col-span-3">{p.team?.name}</div>
                  <div className="col-span-3">{p.tasks?.length || 0}</div>

                  <div className="col-span-2 flex justify-end">
                    <EditProjectModal teams={teams} project={p}>
                      <Button className="bg-foreground/10 hover:bg-foreground/20">
                        <Pencil className="text-foreground" size={24} />
                      </Button>
                    </EditProjectModal>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-10 col-span-12 text-center text-muted-foreground">
                No projects found
              </div>
            )}
          </div>
        </div>

        {meta?.total > limit && (
          <APagination
            currentPage={page}
            setCurrentPage={setPage}
            totalItems={meta?.total}
            itemsPerPage={limit}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectsTable;

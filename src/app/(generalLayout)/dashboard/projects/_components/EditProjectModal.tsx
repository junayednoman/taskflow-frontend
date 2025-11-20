"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog";
import AForm from "@/components/form/AForm";
import { AInput } from "@/components/form/AInput";
import * as z from "zod";
import { ReactNode, useState } from "react";
import { ASelect } from "@/components/form/ASelect";
import { useUpdateProjectMutation } from "@/redux/api/projectApi";
import { TProject } from "../project.interface";
import handleMutation from "@/utils/handleMutation";

const editProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  team: z.string().min(1, "Team name is required"),
});

export type TEditProject = z.infer<typeof editProjectSchema>;

interface EditProjectModalProps {
  children: ReactNode;
  teams: { label: string; value: string }[];
  project: TProject;
}

const EditProjectModal = ({
  children,
  teams,
  project,
}: EditProjectModalProps) => {
  const [open, setOpen] = useState(false);

  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const handleUpdateProject = async (data: TEditProject) => {
    const payload = {
      id: project.id,
      name: data.name,
      teamId: data.team,
    };
    await handleMutation(payload, updateProject, "Updating project...", () => {
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-[.8px]" />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Project</DialogTitle>
        </DialogHeader>

        <AForm<TEditProject>
          schema={editProjectSchema}
          defaultValues={{
            name: project.name,
            team: project.team?.id,
          }}
          onSubmit={handleUpdateProject}
        >
          <AInput
            name="name"
            label="Project Name"
            placeholder="Enter project name"
            required
          />

          <ASelect
            name="team"
            label="Team"
            placeholder="Select a team"
            options={teams}
            required
          />

          <DialogFooter>
            <Button disabled={isUpdating} type="submit">
              {isUpdating ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </AForm>
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectModal;

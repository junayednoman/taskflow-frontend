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
import { ReactNode } from "react";
import { ASelect } from "@/components/form/ASelect";

const editProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  team: z.string().min(1, "Team name is required"),
});

export type TEditProject = z.infer<typeof editProjectSchema>;

interface EditProjectModalProps {
  onEdit: (data: TEditProject) => void;
  children: ReactNode;
  open?: boolean;
  setOpen: (open: boolean) => void;

  // optional default values
  defaultName?: string;
  defaultTeam?: string;
  teams?: { label: string; value: string }[];
}

const EditProjectModal = ({
  onEdit,
  children,
  open,
  setOpen,
  defaultName = "",
  defaultTeam = "",
  teams = [
    { label: "Design", value: "Design" },
    { label: "Development", value: "Development" },
    { label: "Marketing", value: "Marketing" },
    { label: "Sales", value: "Sales" },
    { label: "HR", value: "HR" },
  ],
}: EditProjectModalProps) => {
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
            name: defaultName,
            team: defaultTeam,
          }}
          onSubmit={(data) => onEdit(data)}
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
            <Button type="submit">Update</Button>
          </DialogFooter>
        </AForm>
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectModal;

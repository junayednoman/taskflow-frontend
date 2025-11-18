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
import { ASelect } from "@/components/form/ASelect";
import * as z from "zod";
import { ReactNode } from "react";

// validation schema
const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  team: z.string().min(1, "Team is required"),
});

export type TCreateProject = z.infer<typeof createProjectSchema>;

interface CreateProjectModalProps {
  onCreate: (data: TCreateProject) => void;
  children: ReactNode;
  open?: boolean;
  setOpen: (open: boolean) => void;
  teams?: { label: string; value: string }[];
}

const CreateProjectModal = ({
  onCreate,
  children,
  open,
  setOpen,
  teams = [
    { label: "Design", value: "Design" },
    { label: "Development", value: "Development" },
    { label: "Marketing", value: "Marketing" },
    { label: "Sales", value: "Sales" },
    { label: "HR", value: "HR" },
  ],
}: CreateProjectModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-[.8px]" />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>

        <AForm<TCreateProject>
          schema={createProjectSchema}
          defaultValues={{ name: "", team: "" }}
          onSubmit={(data) => onCreate(data)}
          className="mt-2"
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
            <Button type="submit">Create Project</Button>
          </DialogFooter>
        </AForm>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;

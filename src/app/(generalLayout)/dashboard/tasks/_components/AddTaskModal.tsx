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

export const taskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string(),
  assignedMember: z.string(),
  priority: z.enum(["Low", "Medium", "High"]),
  project: z.string(),
});

export type TTask = z.infer<typeof taskSchema>;

interface AddTaskModalProps {
  onCreate: (task: TTask) => void;
  children: ReactNode;
  open?: boolean;
  setOpen: (open: boolean) => void;
  members?: { value: string; label: string }[];
}

const AddTaskModal = ({
  onCreate,
  children,
  open,
  setOpen,
  members = [
    { value: "unassigned", label: "Unassigned" },
    { value: "Noman", label: "Noman (3/4)" },
    { value: "Sohan", label: "Sohan (1/3)" },
  ],
}: AddTaskModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-[.8px]" />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>

        <AForm<TTask>
          schema={taskSchema}
          defaultValues={{
            title: "",
            description: "",
            assignedMember: "unassigned",
            priority: "Medium",
            project: "Marketing",
          }}
          className="mt-3"
          onSubmit={(data) => onCreate(data)}
        >
          <AInput
            name="title"
            label="Title"
            placeholder="Task title"
            required
          />
          <AInput
            name="description"
            label="Description"
            placeholder="Task description"
          />
          <ASelect
            name="priority"
            label="Priority"
            options={[
              { value: "Low", label: "Low" },
              { value: "Medium", label: "Medium" },
              { value: "High", label: "High" },
            ]}
            required
          />
          <ASelect
            name="project"
            label="Project"
            options={[
              { value: "Smart", label: "Smart" },
              { value: "Mobile", label: "Mobile" },
              { value: "Marketing", label: "Marketing" },
            ]}
            required
          />
          <ASelect
            name="assignedMember"
            label="Assigned Member"
            options={members}
            required
          />
          <DialogFooter>
            <Button type="submit">Add Task</Button>
          </DialogFooter>
        </AForm>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;

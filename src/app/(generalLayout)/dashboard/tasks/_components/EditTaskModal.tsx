import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AForm from "@/components/form/AForm";
import { AInput } from "@/components/form/AInput";
import { ASelect } from "@/components/form/ASelect";
import { Button } from "@/components/ui/button";
import { taskSchema, TTask } from "../task.validation";

interface EditTaskModalProps {
  onEdit: (task: TTask) => void;
  task: TTask;
  children: ReactNode;
  open?: boolean;
  setOpen: (open: boolean) => void;
  members?: { value: string; label: string }[];
}

const EditTaskModal = ({
  onEdit,
  task,
  children,
  open,
  setOpen,
  members = [
    { value: "unassigned", label: "Unassigned" },
    { value: "Noman", label: "Noman (3/4)" },
    { value: "Sohan", label: "Sohan (1/3)" },
  ],
}: EditTaskModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-[.8px]" />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <AForm<TTask>
          schema={taskSchema}
          defaultValues={task}
          onSubmit={(data) => onEdit(data)}
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
            placeholder="Select an assignee"
            required
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

          <DialogFooter>
            <Button type="submit">Update Task</Button>
          </DialogFooter>
        </AForm>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskModal;

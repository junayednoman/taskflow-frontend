"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import AForm from "@/components/form/AForm";
import { AInput } from "@/components/form/AInput";
import { ASelect } from "@/components/form/ASelect";
import { Button } from "@/components/ui/button";

import { taskSchema, TTask as TCreateTask } from "../task.validation";
import handleMutation from "@/utils/handleMutation";

import { useUpdateTaskMutation } from "@/redux/api/taskApi";
import {
  useCheckCapacityMutation,
  useGetLeastLoadedMembersMutation,
} from "@/redux/api/memberApi";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { CapacityAlert } from "./CapacityAlert";
import { TTask } from "../task.interface";

interface EditTaskModalProps {
  children: ReactNode;
  task: TTask;
  members: { value: string; label: string }[];
  projects: { value: string; label: string }[];
  selectedProject: string;
  setSelectedProject: (id: string) => void;
}

const EditTaskModal = ({
  children,
  task,
  members,
  projects,
  selectedProject,
  setSelectedProject,
}: EditTaskModalProps) => {
  const [open, setOpen] = useState(false);
  const [updateTask, { isLoading }] = useUpdateTaskMutation();
  const [memberId, setMemberId] = useState(task?.assignedMember.id || "");
  const [alertOpen, setAlertOpen] = useState(false);

  const [checkCapacity] = useCheckCapacityMutation();
  const [getLeastLoadedMembers] = useGetLeastLoadedMembersMutation();
  useEffect(() => {
    if (task) {
      setSelectedProject(task.project.id);
    }
  }, [task, setSelectedProject]);

  const handleChangeMember = (id: string) => {
    setMemberId(id);

    handleMutation(
      id,
      checkCapacity,
      "Checking member capacity...",
      () => {},
      () => setAlertOpen(true)
    );
  };

  // Auto-Assign logic
  const handleAutoAssign = async () => {
    await handleMutation(
      { projectId: selectedProject },
      getLeastLoadedMembers,
      "Finding least loaded member...",
      (res: any) => {
        setMemberId(res?.data?.member?.id);
      }
    );
  };

  const handleChangeProject = (id: string) => {
    setSelectedProject(id);
    setMemberId("");
  };

  const handleUpdate = async (data: any) => {
    data.projectId = selectedProject;
    data.assignedMemberId = memberId;

    await handleMutation(
      { id: task.id, ...data },
      updateTask,
      "Updating task...",
      () => {
        setOpen(false);
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-[.8px]" />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <AForm<TCreateTask>
          schema={taskSchema}
          defaultValues={{
            title: task?.title,
            description: task?.description,
            priority: task?.priority as "LOW" | "MEDIUM" | "HIGH",
          }}
          onSubmit={handleUpdate}
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
              { value: "LOW", label: "Low" },
              { value: "MEDIUM", label: "Medium" },
              { value: "HIGH", label: "High" },
            ]}
            required
          />

          <Label className="mt-4 mb-2">Project</Label>
          <Select value={selectedProject} onValueChange={handleChangeProject}>
            <SelectTrigger className="w-full !h-11 border-border bg-card text-foreground">
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label className="mt-4 mb-2">Member</Label>

          <Select
            value={memberId}
            onValueChange={handleChangeMember}
            disabled={!selectedProject}
          >
            <SelectTrigger className="w-full !h-11 border-border bg-card text-foreground">
              <SelectValue placeholder="Select a member" />
            </SelectTrigger>

            <SelectContent>
              {members.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Task"}
            </Button>
          </DialogFooter>
        </AForm>

        <CapacityAlert
          open={alertOpen}
          setOpen={setAlertOpen}
          handleAutoAssign={handleAutoAssign}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskModal;

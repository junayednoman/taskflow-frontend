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
import { ReactNode, useState } from "react";
import { useAddTaskMutation } from "@/redux/api/taskApi";
import handleMutation from "@/utils/handleMutation";
import { taskSchema, TTask } from "../task.validation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  useCheckCapacityMutation,
  useGetLeastLoadedMembersMutation,
} from "@/redux/api/memberApi";
import { CapacityAlert } from "./CapacityAlert";

interface TOption {
  value: string;
  label: string;
}

interface AddTaskModalProps {
  children: ReactNode;
  members: TOption[];
  projects: TOption[];
  selectedProject: string;
  setSelectedProject: (projectId: string) => void;
}

const AddTaskModal = ({
  children,
  members,
  projects,
  selectedProject,
  setSelectedProject,
}: AddTaskModalProps) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [addTask, { isLoading }] = useAddTaskMutation();
  const [memberId, setMemberId] = useState<string>("");
  const [checkCapacity] = useCheckCapacityMutation();

  const handleChangeMember = (memberId: string) => {
    setMemberId(memberId);

    handleMutation(
      memberId,
      checkCapacity,
      "Checking member capacity...",
      () => {},
      () => {
        setAlertOpen(true);
      }
    );
  };

  const [getLeastLoadedMembers] = useGetLeastLoadedMembersMutation();

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

  const handleChangeProject = (projectId: string) => {
    if (setSelectedProject) {
      setSelectedProject(projectId);
    }
  };

  const handleCreateTeam = async (data: any) => {
    data.projectId = selectedProject;
    data.assignedMemberId = memberId;
    await handleMutation(data, addTask, "Task is being added...", () => {
      setOpen(false);
      setSelectedProject("");
    });
  };
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
            priority: "HIGH",
            // project: projects[0].value || "",
          }}
          className="mt-3"
          onSubmit={handleCreateTeam}
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
            placeholder="Select a priority"
            options={[
              { value: "LOW", label: "Low" },
              { value: "MEDIUM", label: "Medium" },
              { value: "HIGH", label: "High" },
            ]}
            required
          />
          {/* <ASelect name="project" label="Project" options={projects} required /> */}
          <Label htmlFor="project" className="mb-2 mt-4">
            Project
          </Label>
          <Select value={selectedProject} onValueChange={handleChangeProject}>
            <SelectTrigger
              id="project"
              className="w-full border-border bg-card text-foreground !h-11"
            >
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((p: TOption) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label htmlFor="member" className="mb-2 mt-4">
            Member
          </Label>
          <Select
            value={memberId}
            disabled={!selectedProject}
            onValueChange={handleChangeMember}
          >
            <SelectTrigger
              id="member"
              className="w-full border-border bg-card text-foreground !h-11"
            >
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              {members.map((m: TOption) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Task"}
            </Button>
          </DialogFooter>
        </AForm>
        <CapacityAlert
          handleAutoAssign={handleAutoAssign}
          open={alertOpen}
          setOpen={setAlertOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;

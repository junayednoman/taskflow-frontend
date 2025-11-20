"use client";

import { useState } from "react";
import { APagination } from "@/components/ui/APagination";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import EditTaskModal from "./EditTaskModal";
import { AAlertDialog } from "@/components/modal/AAlertDialog";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetTasksQuery } from "@/redux/api/taskApi";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
import { useGetProjectsQuery } from "@/redux/api/projectApi";
import { TTask } from "../task.interface";
import { TProject } from "../../projects/project.interface";
import { useGetMembersQuery } from "@/redux/api/memberApi";
import { TMember } from "../../members/member.interface";
import AddTaskModal from "./AddTaskModal";

const TasksTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [editTaskId, setEditTaskId] = useState<string | null>(null);

  const handleEditTask = (task: any) => {
    console.log("Edited Task:", task);
    setEditTaskId(null);
  };

  const handleDeleteTask = () => {
    toast.success("Task deleted successfully");
  };

  // fetch project data
  const {
    data: projectData,
    isLoading: isProjectLoading,
    error: projectError,
    refetch: projectRefetch,
  } = useGetProjectsQuery({
    limit: 100,
  });

  const projects = projectData?.data?.projects || [];
  const projectOptions =
    projects?.map((m: TProject) => ({
      value: m.id,
      label: m.name,
    })) || [];

  // fetch members data
  const teamId = projects.filter((p: TProject) => p.id === selectedProject)[0]
    ?.team?.id;

  const {
    data: membersData,
    isLoading: isMembersLoading,
    error: membersError,
    refetch: refetchMembers,
  } = useGetMembersQuery({ limit: 100, team: teamId });
  const members = membersData?.data.members;

  const memberOptions =
    members?.map((m: TMember) => ({
      value: m.id,
      label: `${m.name} (${m._count.tasks}/${m.capacity})`,
    })) || [];

  // fetch tasks
  const params = { page: currentPage, limit } as any;

  if (selectedProject) params.project = selectedProject;
  if (selectedMember) params.member = selectedMember;

  const { data, error, isLoading, refetch } = useGetTasksQuery(params);
  const tasks = data?.data?.tasks || [];

  const meta = data?.meta || {};
  if (isLoading || isProjectLoading || isMembersLoading)
    return <ASpinner className="flex justify-center items-center h-[60vh]" />;

  if (error || projectError || membersError)
    return (
      <AErrorMessage
        error={error || projectError || membersError}
        className="h-[60vh]"
        onRetry={
          error ? refetch : projectError ? projectRefetch : refetchMembers
        }
      />
    );
  return (
    <div>
      <div className="flex justify-end gap-3">
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger className="w-[180px] h-12!">
            <SelectValue placeholder="Filter by project" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((p: TProject) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          disabled={!selectedProject}
          value={selectedMember}
          onValueChange={setSelectedMember}
        >
          <SelectTrigger className="w-[180px] h-12!">
            <SelectValue placeholder="Filter by member" />
          </SelectTrigger>
          <SelectContent>
            {members.map((m: TMember) => (
              <SelectItem key={m.id} value={m.id}>
                {m.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <AddTaskModal
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projectOptions}
          members={memberOptions}
        >
          <Button className="p-6">Add Task</Button>
        </AddTaskModal>
      </div>
      <div className="space-y-8 mt-3">
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <div className="grid grid-cols-7 bg-primary px-6 py-3 text-card font-semibold">
            <div className="col-span-1">Project</div>
            <div className="col-span-1">Title</div>
            <div className="col-span-2">Description</div>
            <div className="col-span-1">Assigned Member</div>
            <div className="col-span-1">Priority</div>
            <div className="col-span-1 text-right">Action</div>
          </div>

          <div className="divide-y divide-border">
            {tasks.length > 0 ? (
              tasks.map((task: TTask) => (
                <div
                  key={task.id}
                  className="grid grid-cols-7 px-6 py-3 items-center hover:bg-accent transition-colors rounded"
                >
                  <div className="col-span-1 font-medium">
                    {task.project.name}
                  </div>
                  <div className="col-span-1 font-medium">{task.title}</div>
                  <div className="col-span-2">{task.description}</div>
                  <div className="col-span-1">{task.assignedMember.name}</div>
                  <div
                    className={`col-span-1 ${
                      task.priority === "HIGH"
                        ? "text-destructive"
                        : task.priority === "MEDIUM"
                        ? "text-yellow-500"
                        : "text-muted-foreground"
                    }`}
                  >
                    {task.priority}
                  </div>
                  <div className="col-span-1 flex justify-end gap-2">
                    <EditTaskModal
                      open={editTaskId === task.id}
                      setOpen={(isOpen: boolean) =>
                        setEditTaskId(isOpen ? task.id : null)
                      }
                      onEdit={handleEditTask}
                      task={task as any}
                    >
                      <Button className="bg-foreground/10 hover:bg-foreground/20">
                        <Pencil className="text-foreground" size={20} />
                      </Button>
                    </EditTaskModal>
                    <AAlertDialog onAction={handleDeleteTask}>
                      <Button className="bg-destructive/10 hover:bg-destructive/20">
                        <Trash2 className="text-destructive" size={20} />
                      </Button>
                    </AAlertDialog>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-7 text-center py-12 text-muted-foreground">
                No tasks found.
              </div>
            )}
          </div>
        </div>

        {meta.total > meta.limit && (
          <APagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItems={meta?.total}
            itemsPerPage={limit}
          />
        )}
      </div>
    </div>
  );
};

export default TasksTable;

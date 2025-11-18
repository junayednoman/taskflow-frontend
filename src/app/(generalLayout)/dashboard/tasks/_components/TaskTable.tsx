"use client";

import { useState } from "react";
import { APagination } from "@/components/ui/APagination";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import EditTaskModal from "./EditTaskModal";
import { AAlertDialog } from "@/components/modal/AAlertDialog";
import { toast } from "sonner";

// Dummy tasks
const tasksData = [
  {
    id: "1",
    title: "Design Homepage",
    description: "Create wireframe and mockup for homepage",
    assignedMember: "Riya",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "2",
    title: "Backend API",
    description: "Set up endpoints for authentication",
    assignedMember: "Imran",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: "3",
    title: "Social Media Post",
    description: "Create content for Instagram",
    assignedMember: "Fahim",
    priority: "Low",
    status: "Done",
  },
];

const TasksTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);

  const handleEditTask = (task: any) => {
    console.log("Edited Task:", task);
    setEditTaskId(null);
  };

  const handleDeleteTask = () => {
    toast.success("Task deleted successfully");
  };

  return (
    <div className="space-y-8 mt-3">
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <div className="grid grid-cols-6 bg-primary px-6 py-3 text-card font-semibold">
          <div className="col-span-1">Title</div>
          <div className="col-span-2">Description</div>
          <div className="col-span-1">Assigned Member</div>
          <div className="col-span-1">Priority</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        <div className="divide-y divide-border">
          {tasksData.map((task: any) => (
            <div
              key={task.id}
              className="grid grid-cols-6 px-6 py-3 items-center hover:bg-accent transition-colors rounded"
            >
              <div className="col-span-1 font-medium">{task.title}</div>
              <div className="col-span-2">{task.description}</div>
              <div className="col-span-1">{task.assignedMember}</div>
              <div
                className={`col-span-1 ${
                  task.priority === "High"
                    ? "text-destructive"
                    : task.priority === "Medium"
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
                  task={task}
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
          ))}
        </div>
      </div>

      <APagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={70}
        initialPage={1}
        maxVisiblePages={5}
        itemsPerPage={10}
      />
    </div>
  );
};

export default TasksTable;

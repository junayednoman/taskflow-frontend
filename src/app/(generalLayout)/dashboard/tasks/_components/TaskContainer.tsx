"use client";
import AContainer from "@/components/AContainer";
import TasksTable from "./TaskTable";
import AddTaskModal, { TTask } from "./AddTaskModal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TasksContainer = () => {
  const [open, setOpen] = useState(false);

  const handleCreateTeam = (data: TTask) => {
    toast.success("Project created successfully");
    setOpen(false);
    console.log("data, ", data);
  };

  return (
    <AContainer>
      <div className="space-y-3">
        <h3 className="text-3xl font-bold">Tasks</h3>
        <p className="text-base text-card-foreground">
          Manage all your tasks, track their status, and assign them to team
          members
        </p>
      </div>
      <div className="flex justify-end gap-3">
        <Select>
          <SelectTrigger className="w-[180px] h-12!">
            <SelectValue placeholder="Filter by project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Smart">Smart Dashboard</SelectItem>
            <SelectItem value="Mobile">Mobile App UI</SelectItem>
            <SelectItem value="Marketing">Marketing Campaign</SelectItem>
            <SelectItem value="SEO">SEO Overhaul</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px] h-12!">
            <SelectValue placeholder="Filter by member" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Riya">Riya</SelectItem>
            <SelectItem value="Noor">Noor</SelectItem>
            <SelectItem value="Farhan">Farhan</SelectItem>
            <SelectItem value="Imran">Imran</SelectItem>
            <SelectItem value="Sara">Sara</SelectItem>
          </SelectContent>
        </Select>
        <AddTaskModal open={open} setOpen={setOpen} onCreate={handleCreateTeam}>
          <Button className="p-6">Add Task</Button>
        </AddTaskModal>
      </div>
      <TasksTable />
    </AContainer>
  );
};

export default TasksContainer;

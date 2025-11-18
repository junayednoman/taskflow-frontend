"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import CreateTeamModal, { TCreateMember } from "./CreateMemberModal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { APagination } from "@/components/ui/APagination";

// Dummy teams and members
const teams = [
  { id: "team1", name: "Design" },
  { id: "team2", name: "Development" },
  { id: "team3", name: "Marketing" },
];

const membersData = {
  team1: [
    { id: "1", name: "Riya", role: "Designer", currentTasks: 2, capacity: 3 },
    { id: "2", name: "Sara", role: "UX", currentTasks: 2, capacity: 4 },
    {
      id: "3",
      name: "Maya",
      role: "Illustrator",
      currentTasks: 5,
      capacity: 3,
    },
    {
      id: "4",
      name: "Aria",
      role: "UI Designer",
      currentTasks: 3,
      capacity: 3,
    },
    { id: "5", name: "Noor", role: "Animator", currentTasks: 2, capacity: 2 },
    {
      id: "6",
      name: "Lina",
      role: "Graphic Designer",
      currentTasks: 5,
      capacity: 4,
    },
    {
      id: "19",
      name: "Hiba",
      role: "Brand Designer",
      currentTasks: 3,
      capacity: 4,
    },
    {
      id: "20",
      name: "Ava",
      role: "Motion Designer",
      currentTasks: 4,
      capacity: 5,
    },
    {
      id: "21",
      name: "Meera",
      role: "Creative Lead",
      currentTasks: 5,
      capacity: 5,
    },
    {
      id: "22",
      name: "Selena",
      role: "Visual Artist",
      currentTasks: 1,
      capacity: 3,
    },
  ],

  team2: [
    { id: "7", name: "Farhan", role: "Frontend", currentTasks: 2, capacity: 5 },
    { id: "8", name: "Nabil", role: "Backend", currentTasks: 1, capacity: 4 },
    { id: "9", name: "Imran", role: "Fullstack", currentTasks: 5, capacity: 5 },
    { id: "10", name: "Rahat", role: "DevOps", currentTasks: 3, capacity: 3 },
    { id: "11", name: "Sami", role: "Mobile", currentTasks: 4, capacity: 4 },
    { id: "12", name: "Tanvir", role: "QA", currentTasks: 2, capacity: 3 },
    {
      id: "23",
      name: "Kamal",
      role: "System Architect",
      currentTasks: 3,
      capacity: 4,
    },
    {
      id: "24",
      name: "Junaid",
      role: "React Developer",
      currentTasks: 5,
      capacity: 5,
    },
    {
      id: "25",
      name: "Bashir",
      role: "Node.js Developer",
      currentTasks: 2,
      capacity: 3,
    },
    { id: "26", name: "Fardeen", role: "Tester", currentTasks: 1, capacity: 2 },
  ],

  team3: [
    { id: "13", name: "Tania", role: "SEO", currentTasks: 3, capacity: 3 },
    { id: "14", name: "Arif", role: "Content", currentTasks: 2, capacity: 5 },
    {
      id: "15",
      name: "Fahim",
      role: "Social Media",
      currentTasks: 4,
      capacity: 3,
    },
    {
      id: "16",
      name: "Rashed",
      role: "Marketing Analyst",
      currentTasks: 1,
      capacity: 3,
    },
    {
      id: "17",
      name: "Nusrat",
      role: "PR Specialist",
      currentTasks: 2,
      capacity: 2,
    },
    {
      id: "18",
      name: "Shirin",
      role: "Copywriter",
      currentTasks: 3,
      capacity: 3,
    },
    {
      id: "27",
      name: "Omar",
      role: "Email Marketer",
      currentTasks: 4,
      capacity: 4,
    },
    {
      id: "28",
      name: "Sadia",
      role: "Content Strategist",
      currentTasks: 5,
      capacity: 5,
    },
    {
      id: "29",
      name: "Mahin",
      role: "Ad Specialist",
      currentTasks: 3,
      capacity: 4,
    },
    {
      id: "30",
      name: "Rupom",
      role: "Growth Marketer",
      currentTasks: 2,
      capacity: 3,
    },
  ],
} as any;

const MemberTable = () => {
  const [page, setPage] = useState(1);
  const [selectedTeam, setSelectedTeam] = useState("team1");
  const members = membersData[selectedTeam] || [];

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleCreateMember = (data: TCreateMember) => {
    toast.success("Member created successfully");
    console.log("data, ", data);
    setOpenCreateModal(false);
  };

  return (
    <Card className="w-full mx-auto shadow-none! border-border/60 mt-6">
      <CardHeader className="flex justify-between items-center">
        <Select value={selectedTeam} onValueChange={setSelectedTeam}>
          <SelectTrigger className="w-48 h-12! border-border">
            <SelectValue placeholder="Select Team" />
          </SelectTrigger>
          <SelectContent>
            {teams.map((team) => (
              <SelectItem key={team.id} value={team.id}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <CreateTeamModal
          open={openCreateModal}
          setOpen={setOpenCreateModal}
          onCreate={handleCreateMember}
        >
          <Button className="p-6">Create Member</Button>
        </CreateTeamModal>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <div className="grid grid-cols-12 bg-primary px-4 py-3 text-card font-semibold">
            <div className="col-span-4">Name</div>
            <div className="col-span-3">Role</div>
            <div className="col-span-2">Current Tasks</div>
            <div className="col-span-2">Capacity</div>
            <div className="col-span-1">Status</div>
          </div>
          <div className="divide-y divide-border">
            {members.length > 0 ? (
              members.map((member: any) => {
                const overload = member.currentTasks > member.capacity;
                return (
                  <div
                    key={member.id}
                    className={`grid grid-cols-12 px-4 py-3 items-center ${
                      overload ? "bg-destructive/5" : ""
                    }`}
                  >
                    <div className="col-span-4">{member.name}</div>
                    <div className="col-span-3">{member.role}</div>
                    <div className="col-span-2 font-medium">
                      {member.currentTasks}
                    </div>
                    <div className="col-span-2">{member.capacity}</div>
                    <div
                      className={`col-span-1 font-medium ${
                        overload ? "text-destructive" : "text-green-600"
                      }`}
                    >
                      {overload ? "Overloaded" : "OK"}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-10 col-span-12 text-center text-muted-foreground">
                No members found
              </div>
            )}
          </div>
        </div>
      </CardContent>
      {/* pagination */}
      <div className="mt-2">
        <APagination
          currentPage={page}
          setCurrentPage={setPage}
          totalItems={100}
          itemsPerPage={10}
        />
      </div>
    </Card>
  );
};

export default MemberTable;

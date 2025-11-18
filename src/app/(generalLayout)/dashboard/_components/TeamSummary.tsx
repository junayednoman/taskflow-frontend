"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
  ],
  team2: [
    { id: "7", name: "Farhan", role: "Frontend", currentTasks: 2, capacity: 5 },
    { id: "8", name: "Nabil", role: "Backend", currentTasks: 1, capacity: 4 },
    { id: "9", name: "Imran", role: "Fullstack", currentTasks: 5, capacity: 5 },
    { id: "10", name: "Rahat", role: "DevOps", currentTasks: 3, capacity: 3 },
    { id: "11", name: "Sami", role: "Mobile", currentTasks: 4, capacity: 4 },
    { id: "12", name: "Tanvir", role: "QA", currentTasks: 2, capacity: 3 },
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
  ],
} as any;

const TeamSummary = () => {
  const [selectedTeam, setSelectedTeam] = useState("team1");
  const members = membersData[selectedTeam] || [];

  return (
    <Card className="w-full mx-auto shadow-none! border-border/60">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-xl font-bold">Team Summary</CardTitle>
        <Select value={selectedTeam} onValueChange={setSelectedTeam}>
          <SelectTrigger className="w-48">
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
    </Card>
  );
};

export default TeamSummary;

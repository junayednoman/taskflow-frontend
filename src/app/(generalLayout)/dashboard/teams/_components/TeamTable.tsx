"use client";

import { APagination } from "@/components/ui/APagination";
import { Button } from "@/components/ui/button";
import { Eye, Pencil } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import EditTeamModal from "./EditTeamModal";

// Dummy data for teams
const teamsData = [
  {
    id: "team1",
    name: "Design",
    totalMembers: 6,
    totalTasks: 16,
    totalCapacity: 18,
  },
  {
    id: "team2",
    name: "Development",
    totalMembers: 6,
    totalTasks: 14,
    totalCapacity: 20,
  },
  {
    id: "team3",
    name: "Marketing",
    totalMembers: 6,
    totalTasks: 15,
    totalCapacity: 18,
  },
  {
    id: "team4",
    name: "Sales",
    totalMembers: 5,
    totalTasks: 12,
    totalCapacity: 15,
  },
  { id: "team5", name: "HR", totalMembers: 4, totalTasks: 6, totalCapacity: 8 },
  {
    id: "team6",
    name: "Finance",
    totalMembers: 5,
    totalTasks: 10,
    totalCapacity: 12,
  },
  {
    id: "team7",
    name: "Support",
    totalMembers: 6,
    totalTasks: 18,
    totalCapacity: 16,
  },
  {
    id: "team8",
    name: "QA",
    totalMembers: 4,
    totalTasks: 7,
    totalCapacity: 10,
  },
  {
    id: "team9",
    name: "Content",
    totalMembers: 5,
    totalTasks: 11,
    totalCapacity: 12,
  },
  {
    id: "team10",
    name: "Operations",
    totalMembers: 6,
    totalTasks: 14,
    totalCapacity: 15,
  },
];

const TeamsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openTeamId, setOpenTeamId] = useState<string | null>(null);
  const handleEditTeam = (name: string) => {
    toast.success("Team updated successfully");
    console.log("data, ", name);
    setOpenTeamId(null);
  };
  return (
    <div className="space-y-8">
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white mt-4">
        <div className="grid grid-cols-12 bg-primary px-6 py-3 text-card font-semibold">
          <div className="col-span-4">Team Name</div>
          <div className="col-span-2">Members</div>
          <div className="col-span-2">Total Tasks</div>
          <div className="col-span-2">Capacity</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        <div className="divide-y divide-border">
          {teamsData.length > 0 ? (
            teamsData.map((team) => {
              const isOverloaded = team.totalTasks > team.totalCapacity;
              return (
                <div
                  key={team.id}
                  className={`grid grid-cols-12 px-6 py-3 items-center hover:bg-accent transition-colors rounded`}
                >
                  <div className="col-span-4 font-medium">{team.name}</div>
                  <div className="col-span-2">{team.totalMembers}</div>
                  <div className="col-span-2">{team.totalTasks}</div>
                  <div
                    className={`col-span-2 font-medium ${
                      isOverloaded ? "text-destructive" : "text-green-600"
                    }`}
                  >
                    {team.totalTasks}/{team.totalCapacity}
                  </div>
                  <div className="col-span-2 flex justify-end gap-2">
                    <Tooltip>
                      <TooltipTrigger>
                        <Button className="bg-primary/10 hover:bg-primary/20">
                          <Eye className="text-primary" size={27} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Members</p>
                      </TooltipContent>
                    </Tooltip>
                    <EditTeamModal
                      key={team.id}
                      open={openTeamId === team.id}
                      setOpen={(isOpen) =>
                        setOpenTeamId(isOpen ? team.id : null)
                      }
                      onEdit={handleEditTeam}
                    >
                      <Button className="bg-foreground/10 hover:bg-foreground/20">
                        <Pencil className="text-foreground" size={27} />
                      </Button>
                    </EditTeamModal>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-4 py-10 col-span-12 text-center text-muted-foreground">
              No teams found
            </div>
          )}
        </div>
      </div>
      {/* pagination */}
      <APagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={100}
        initialPage={1}
        maxVisiblePages={5}
        itemsPerPage={10}
      />
    </div>
  );
};

export default TeamsTable;

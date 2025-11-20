"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TMember } from "../members/member.interface";
import { TTeam } from "../teams/team.interface";

const TeamSummary = ({
  memberData,
  teams,
  selectedTeam,
  setSelectedTeam,
}: {
  memberData: TMember[];
  teams: TTeam[];
  selectedTeam: string;
  setSelectedTeam: (teamId: string) => void;
}) => {
  return (
    <Card className="w-full mx-auto shadow-none! border-border/60">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-xl font-bold">Team Summary</CardTitle>
        <Select value={selectedTeam} onValueChange={setSelectedTeam}>
          <SelectTrigger className="w-48 h-11! border-border">
            <SelectValue placeholder="Select Team" />
          </SelectTrigger>
          <SelectContent>
            {teams?.map((team: TTeam) => (
              <SelectItem key={team?.id} value={team?.id}>
                {team?.name}
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
            {memberData?.length > 0 ? (
              memberData?.map((member: TMember) => {
                const overload = member._count.tasks > member.capacity;
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
                      {member._count.tasks}
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
              <div className="px-4 py-44 col-span-12 text-center text-muted-foreground">
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

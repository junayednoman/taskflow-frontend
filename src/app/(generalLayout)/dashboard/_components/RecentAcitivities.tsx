"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TLog } from "../logs/logs.interface";
import { format } from "date-fns";
import { useReAssignTaskMutation } from "@/redux/api/taskApi";
import handleMutation from "@/utils/handleMutation";

const RecentActivities = ({ logsData }: { logsData: TLog[] }) => {
  const [reAssign, { isLoading }] = useReAssignTaskMutation();

  const handleReassign = async () => {
    await handleMutation({}, reAssign, "Task re-assigning...");
  };

  return (
    <Card className="w-full mx-auto border-border/60 shadow-none">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="text-xl font-bold">
            Recent Reassignments
          </CardTitle>
          <Button disabled={isLoading} onClick={handleReassign} className="p-6">
            {isLoading ? "Reassigning..." : "Reassign Task"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <div className="grid grid-cols-12 bg-primary px-4 py-3 text-card font-semibold">
            <div className="col-span-4">Task</div>
            <div className="col-span-3">From</div>
            <div className="col-span-3">To</div>
            <div className="col-span-2">Date Time</div>
          </div>

          <div className="divide-y divide-border">
            {logsData.length > 0 ? (
              logsData.map((log) => (
                <div
                  key={log.id}
                  className="grid grid-cols-12 px-4 py-3 items-center hover:bg-accent transition-colors rounded"
                >
                  <div className="col-span-4 font-medium">{log.task.title}</div>
                  <div className="col-span-3">{log.fromMember.name}</div>
                  <div className="col-span-3">{log.toMember.name}</div>
                  <div className="col-span-2">
                    {format(new Date(log.dateTime), "PPpp")}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-10 col-span-12 text-center text-muted-foreground">
                No activity logs yet
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;

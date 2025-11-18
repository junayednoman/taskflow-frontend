"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Dummy activity log data
const activityLogs = [
  { id: "1", time: "10:30 AM", task: "UI Design", from: "Riya", to: "Farhan" },
  {
    id: "2",
    time: "11:00 AM",
    task: "Backend API",
    from: "Nabil",
    to: "Farhan",
  },
  { id: "3", time: "11:15 AM", task: "Landing Page", from: "Sara", to: "Riya" },
  {
    id: "4",
    time: "12:00 PM",
    task: "SEO Optimization",
    from: "Tania",
    to: "Arif",
  },
  { id: "5", time: "12:30 PM", task: "Wireframes", from: "Maya", to: "Aria" },
  {
    id: "6",
    time: "01:00 PM",
    task: "Marketing Copy",
    from: "Fahim",
    to: "Nusrat",
  },
];

const RecentActivities = () => {
  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="text-xl font-bold">
            Recent Reassignments
          </CardTitle>
          <Button>Reassign Tasks</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <div className="grid grid-cols-12 bg-primary px-4 py-3 text-card font-semibold">
            <div className="col-span-2">Time</div>
            <div className="col-span-4">Task</div>
            <div className="col-span-3">From</div>
            <div className="col-span-3">To</div>
          </div>

          <div className="divide-y divide-border">
            {activityLogs.length > 0 ? (
              activityLogs.map((log) => (
                <div
                  key={log.id}
                  className="grid grid-cols-12 px-4 py-3 items-center hover:bg-accent transition-colors rounded"
                >
                  <div className="col-span-2">{log.time}</div>
                  <div className="col-span-4 font-medium">{log.task}</div>
                  <div className="col-span-3">{log.from}</div>
                  <div className="col-span-3">{log.to}</div>
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

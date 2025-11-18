"use client";

import { useState } from "react";
import { APagination } from "@/components/ui/APagination";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { AAlertDialog } from "@/components/modal/AAlertDialog";
import { toast } from "sonner";

// Dummy logs
const logsData = [
  {
    id: "1",
    date: "2025-11-18",
    user: "Rafi",
    action: "Created Project",
    details: "New project 'Website Revamp' created",
  },
  {
    id: "2",
    date: "2025-11-18",
    user: "Imran",
    action: "Updated Task",
    details: "Changed task status to In Progress",
  },
  {
    id: "3",
    date: "2025-11-17",
    user: "Fahim",
    action: "Deleted Member",
    details: "Removed user from team",
  },
];

const LogsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleDeleteLog = () => {
    toast.success("Log entry deleted");
  };

  return (
    <div className="space-y-8 mt-6">
      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        {/* Header */}
        <div className="grid grid-cols-5 bg-primary px-6 py-3 text-card font-semibold">
          <div>Date</div>
          <div>User</div>
          <div>Action</div>
          <div className="col-span-1">Details</div>
          <div className="text-right">Action</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border">
          {logsData.map((log: any) => (
            <div
              key={log.id}
              className="grid grid-cols-5 px-6 py-3 items-center hover:bg-accent transition-colors rounded"
            >
              <div className="font-medium">{log.date}</div>
              <div className="font-medium">{log.user}</div>
              <div>{log.action}</div>
              <div className="col-span-1">{log.details}</div>

              <div className="flex justify-end">
                <AAlertDialog onAction={handleDeleteLog}>
                  <Button className="bg-destructive/10 hover:bg-destructive/20">
                    <Trash2 className="text-destructive" size={20} />
                  </Button>
                </AAlertDialog>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <APagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={200} // your real log count
        initialPage={1}
        maxVisiblePages={5}
        itemsPerPage={10}
      />
    </div>
  );
};

export default LogsTable;

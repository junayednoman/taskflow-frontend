"use client";

import { useState } from "react";
import { APagination } from "@/components/ui/APagination";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { AAlertDialog } from "@/components/modal/AAlertDialog";
import { useGetLogsQuery, useDeleteLogMutation } from "@/redux/api/logsApi";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
import handleMutation from "@/utils/handleMutation";
import { format } from "date-fns";

const LogsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const [deleteLog] = useDeleteLogMutation();
  const { data, error, isLoading, refetch } = useGetLogsQuery({
    page: currentPage,
    limit,
  });

  const logsData = data?.data?.logs || [];
  const meta = data?.data?.meta || { total: 0, page: 1, limit: 10 };

  const handleDeleteLog = async (id: string) => {
    handleMutation(id, deleteLog, "Deleting log...", () => {});
  };

  if (isLoading) {
    return <ASpinner className="flex justify-center items-center h-[60vh]" />;
  }

  if (error) {
    return (
      <AErrorMessage error={error} className="h-[60vh]" onRetry={refetch} />
    );
  }

  return (
    <div className="space-y-8 mt-6">
      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        {/* Header */}
        <div className="grid grid-cols-5 bg-primary px-6 py-3 text-card font-semibold">
          <div>Date</div>
          <div>From</div>
          <div>To</div>
          <div className="col-span-1">Task</div>
          <div className="text-right">Action</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border">
          {logsData.map((log: any) => (
            <div
              key={log.id}
              className="grid grid-cols-5 px-6 py-3 items-center hover:bg-accent transition-colors rounded"
            >
              <div className="font-medium">
                {format(new Date(log.dateTime), "PPpp")}
              </div>
              <div className="font-medium">{log.fromMember?.name}</div>
              <div>{log.toMember?.name}</div>
              <div className="col-span-1">{log.task?.title}</div>
              <div className="flex justify-end">
                <AAlertDialog onAction={() => handleDeleteLog(log.id)}>
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
      {meta.total > meta.limit && (
        <APagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={meta.total}
          maxVisiblePages={5}
          itemsPerPage={limit}
        />
      )}
    </div>
  );
};

export default LogsTable;

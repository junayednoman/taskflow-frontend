"use client";

import { APagination } from "@/components/ui/APagination";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import EditProjectModal, { TEditProject } from "./EditProjectModal";

// Dummy project data
const projectData = [
  {
    id: "p1",
    name: "Smart Dashboard",
    team: "Design",
    tasks: 24,
    progress: "60%",
  },
  {
    id: "p2",
    name: "Mobile App UI",
    team: "Development",
    tasks: 30,
    progress: "80%",
  },
  {
    id: "p3",
    name: "Marketing Campaign",
    team: "Marketing",
    tasks: 18,
    progress: "45%",
  },
  {
    id: "p4",
    name: "SEO Overhaul",
    team: "Content",
    tasks: 12,
    progress: "30%",
  },
  {
    id: "p5",
    name: "Customer Portal",
    team: "QA",
    tasks: 22,
    progress: "55%",
  },
];

const ProjectsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);

  const handleEdit = (data: TEditProject) => {
    toast.success("Project updated!");
    setOpenProjectId(null);
    console.log("data", data);
  };

  return (
    <div className="space-y-8">
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white mt-4">
        <div className="grid grid-cols-12 bg-primary px-6 py-3 text-card font-semibold">
          <div className="col-span-4">Project Name</div>
          <div className="col-span-3">Team</div>
          <div className="col-span-3">Tasks</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        <div className="divide-y divide-border">
          {projectData.length > 0 ? (
            projectData.map((p) => (
              <div
                key={p.id}
                className="grid grid-cols-12 px-6 py-3 items-center hover:bg-accent transition-colors"
              >
                <div className="col-span-4 font-medium">{p.name}</div>
                <div className="col-span-3">{p.team}</div>
                <div className="col-span-3">{p.tasks}</div>

                <div className="col-span-2 flex justify-end gap-2">
                  <EditProjectModal
                    open={openProjectId === p.id}
                    setOpen={(isOpen) => setOpenProjectId(isOpen ? p.id : null)}
                    onEdit={handleEdit}
                  >
                    <Button className="bg-foreground/10 hover:bg-foreground/20">
                      <Pencil className="text-foreground" size={27} />
                    </Button>
                  </EditProjectModal>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-10 col-span-12 text-center text-muted-foreground">
              No projects found
            </div>
          )}
        </div>
      </div>

      <APagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={50}
        initialPage={1}
        maxVisiblePages={5}
        itemsPerPage={10}
      />
    </div>
  );
};

export default ProjectsTable;

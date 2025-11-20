export interface TTask {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
  project: Project;
  assignedMember: AssignedMember;
}

interface Project {
  id: string;
  name: string;
}

interface AssignedMember {
  id: string;
  name: string;
}

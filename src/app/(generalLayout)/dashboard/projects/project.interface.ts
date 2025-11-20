export interface TProject {
  id: string;
  name: string;
  team: Team;
  tasks: Task[];
  createdAt: string;
}

interface Team {
  id: string;
  name: string;
}

interface Task {
  id: string;
}

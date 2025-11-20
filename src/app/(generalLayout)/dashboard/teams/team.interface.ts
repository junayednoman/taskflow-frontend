export interface TTeam {
  id: string;
  name: string;
  createdAt: string;
  _count: TCount;
  members: TMember[];
  projects: TProject[];
  totalTasks: number;
  totalCapacity: number;
}

export interface TCount {
  members: number;
  projects: number;
}

export interface TMember {
  capacity: number;
}

export interface TProject {
  _count: TCount2;
}

export interface TCount2 {
  tasks: number;
}

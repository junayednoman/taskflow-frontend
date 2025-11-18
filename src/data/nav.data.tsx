import { ListTodo, PanelsTopLeft, ScrollText, Users } from "lucide-react";

type TNavMain = {
  title: string;
  url: string;
  icon: React.ReactNode;
}[];

export const navItems: TNavMain = [
  {
    title: "Teams",
    url: "/dashboard/teams",
    icon: <Users />,
  },
  {
    title: "Members",
    url: "/dashboard/members",
    icon: <Users />,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: <PanelsTopLeft />,
  },
  {
    title: "Tasks",
    url: "/dashboard/tasks",
    icon: <ListTodo />,
  },
  {
    title: "Activity Logs",
    url: "/dashboard/logs",
    icon: <ScrollText />,
  },
];

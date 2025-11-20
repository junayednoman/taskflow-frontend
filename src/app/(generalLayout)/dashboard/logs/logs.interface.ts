export interface TLog {
  id: string;
  task: TTask;
  fromMember: TFromMember;
  toMember: TToMember;
  dateTime: string;
}

export interface TTask {
  title: string;
}

export interface TFromMember {
  name: string;
}

export interface TToMember {
  name: string;
}

export interface TMember {
  id: string
  name: string
  role: string
  capacity: number
  _count: TCount
}

export interface TCount {
  tasks: number
}

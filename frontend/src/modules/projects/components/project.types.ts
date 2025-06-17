export interface ProjectDialogProps {
  project: IProject
  openDialog: boolean
  setOpenDialog: (openDialog: boolean) => void
}

export interface IProject {
  id: string
  name: string
  colour: string
  userId: string
  isFavourite: boolean
}

export interface ProjectsData {
  projects: Array<IProject & { taskCount: number }>
  count: number
}

export enum Priority {
  URGENT = "urgent",
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}

export interface ITask {
  id: number
  name: string
  description?: string
  createdAt: string
  dueDate?: string
  priority?: keyof typeof Priority
  userId: number
  projectId?: number
}

export interface ProjectWithTasks {
  projectName: IProject["name"]
  tasks: ITask[]
}

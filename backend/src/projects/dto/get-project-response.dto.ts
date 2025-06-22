import { UpdateTaskDto } from "src/tasks/dto/update-task.dto"

export class GetProjectResponseDto {
  projectName: string
  tasks: UpdateTaskDto[]
}

import { UpdateProjectDto } from "./update-project.dto"

export class GetProjectsResponseDto extends UpdateProjectDto {
  taskCount: number
}

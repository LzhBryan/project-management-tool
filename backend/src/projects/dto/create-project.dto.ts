import { OmitType } from "@nestjs/mapped-types"
import { UpdateProjectDto } from "./update-project.dto"

export class CreateProjectDto extends OmitType(UpdateProjectDto, ["id"] as const) {}

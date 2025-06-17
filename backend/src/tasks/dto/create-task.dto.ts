import { OmitType } from "@nestjs/mapped-types"
import { UpdateTaskDto } from "./update-task.dto"

export class CreateTaskDto extends OmitType(UpdateTaskDto, ["id"] as const) {}

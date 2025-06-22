import { OmitType } from "@nestjs/swagger"
import { UpdateTaskDto } from "./update-task.dto"

export class CreateTaskDto extends OmitType(UpdateTaskDto, ["id"] as const) {}

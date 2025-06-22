import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator"
import { Priority, PriorityEnum } from "drizzle/schema/tasks"

export class UpdateTaskDto {
  @IsNumber()
  id: number

  @IsNotEmpty({ message: "Please provide name field" })
  name: string

  @IsOptional()
  description: string | null

  @IsDate()
  dueDate: Date | null

  @IsEnum(PriorityEnum)
  priority: Priority | null

  @IsNumber()
  @IsNotEmpty({ message: "Please provide the associated project id" })
  projectId: number | null
}

import { IsNumber, IsNotEmpty, IsOptional, IsDate, IsEnum } from "class-validator"
import { PriorityEnum, Priority } from "drizzle/schema/tasks"

export class UpdateTaskDto {
  @IsNumber()
  id: number

  @IsNotEmpty({ message: "Please provide name field" })
  name: string

  @IsOptional()
  description: string

  @IsDate()
  dueDate: string

  @IsEnum(PriorityEnum)
  priority: Priority

  @IsNumber()
  @IsNotEmpty({ message: "Please provide the associated project id" })
  projectId: number
}

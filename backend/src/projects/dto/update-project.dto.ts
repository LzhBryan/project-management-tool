import { IsHexColor, IsNotEmpty, IsNumber, IsOptional } from "class-validator"
import { ColoursType } from "drizzle/schema/projects"

export class UpdateProjectDto {
  @IsNumber()
  id: number

  @IsNotEmpty({ message: "Please provide name field" })
  name: string

  @IsOptional()
  @IsHexColor()
  colour: ColoursType | undefined
}

import { ApiProperty } from "@nestjs/swagger"
import { IsHexColor, IsNotEmpty, IsNumber } from "class-validator"
import { colours, ColoursType } from "drizzle/schema/projects"

export class UpdateProjectDto {
  @IsNumber()
  id: number

  @IsNotEmpty({ message: "Please provide name field" })
  name: string

  @ApiProperty({ enum: colours })
  @IsHexColor()
  colour?: ColoursType
}

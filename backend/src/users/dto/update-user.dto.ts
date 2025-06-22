import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UpdateUserDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number

  @ApiProperty({ example: "John Doe" })
  @IsNotEmpty({ message: "Please provide name field" })
  @IsString()
  name: string

  @ApiProperty({ example: "johnDoe@example.com" })
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({ example: "123456" })
  @IsString()
  password: string
}

import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UpdateUserDto {
  @IsNumber()
  id: number

  @IsNotEmpty({ message: "Please provide name field" })
  @IsString()
  name: string

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  password: string
}

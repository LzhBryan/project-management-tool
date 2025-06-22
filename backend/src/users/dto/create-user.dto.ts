import { OmitType } from "@nestjs/swagger"
import { UpdateUserDto } from "./update-user.dto"

export class CreateUserDto extends OmitType(UpdateUserDto, ["id"] as const) {}

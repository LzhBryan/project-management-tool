import { Body, Controller, Delete, Get, Param, Patch, Res } from "@nestjs/common"
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger"
import { Response } from "express"
import { UpdateUserDto } from "./dto/update-user.dto"
import { UsersService } from "./users.service"

@Controller("/api/users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiOperation({ summary: "Get user details" })
  @ApiOkResponse({ description: "User details fetched successfully" })
  @ApiNotFoundResponse({ description: "User with email johnDoe@example.com not found" })
  getUserDetail(@Res() res: Response) {
    return res.json()
  }

  @ApiOperation({ summary: "Update a user details" })
  @Patch(":id")
  updateUser(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto)
  }

  @ApiOperation({ summary: "Delete a user" })
  @Delete(":id")
  deleteUser(@Param("id") id: string) {
    return this.userService.deleteUser(+id)
  }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "@nestjs/common"
import { ApiOperation } from "@nestjs/swagger"
import { AuthenticatedRequest } from "src/auth/auth.controller"
import { CreateTaskDto } from "./dto/create-task.dto"
import { UpdateTaskDto } from "./dto/update-task.dto"
import { TasksService } from "./tasks.service"

@Controller("/api/tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: "Create a new task" })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: AuthenticatedRequest) {
    return this.tasksService.create(createTaskDto, req.user.userId)
  }

  @ApiOperation({ summary: "Retrieve all tasks from a user" })
  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    return this.tasksService.findAll(req.user.userId)
  }

  @ApiOperation({ summary: "Retrieve a task" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tasksService.findOne(+id)
  }

  @ApiOperation({ summary: "Update a task" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto)
  }

  @ApiOperation({ summary: "Delete a task" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tasksService.remove(+id)
  }
}

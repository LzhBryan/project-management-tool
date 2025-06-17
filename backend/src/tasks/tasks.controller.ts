import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from "@nestjs/common"
import { TasksService } from "./tasks.service"
import { CreateTaskDto } from "./dto/create-task.dto"
import { UpdateTaskDto } from "./dto/update-task.dto"
import { AuthenticatedRequest } from "src/auth/auth.controller"

@Controller("/api/tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: AuthenticatedRequest) {
    return this.tasksService.create(createTaskDto, req.user.userId)
  }

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    return this.tasksService.findAll(req.user.userId)
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tasksService.findOne(+id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tasksService.remove(+id)
  }
}

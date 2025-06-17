import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from "@nestjs/common"
import { ProjectsService } from "./projects.service"
import { CreateProjectDto } from "./dto/create-project.dto"
import { UpdateProjectDto } from "./dto/update-project.dto"
import { AuthenticatedRequest } from "src/auth/auth.controller"

@Controller("/api/projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Req() req: AuthenticatedRequest, @Body() createProjectDto: CreateProjectDto) {
    const newProjectName = await this.projectsService.create(createProjectDto, req.user.userId)
    return { projectName: newProjectName }
  }

  @Get()
  async findAll(@Req() req: AuthenticatedRequest) {
    const projects = await this.projectsService.findAll(req.user.userId)
    return { projects, count: projects.length }
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.projectsService.findOne(+id)
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return await this.projectsService.update(+id, updateProjectDto)
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.projectsService.remove(+id)
  }
}

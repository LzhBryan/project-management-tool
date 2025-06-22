import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "@nestjs/common"
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger"
import { AuthenticatedRequest } from "src/auth/auth.controller"
import { CreateProjectResponseDto } from "./dto/create-project-response.dto"
import { CreateProjectDto } from "./dto/create-project.dto"
import { GetProjectResponseDto } from "./dto/get-project-response.dto"
import { GetProjectsResponseDto } from "./dto/get-projects-response.dto"
import { UpdateProjectDto } from "./dto/update-project.dto"
import { ProjectsService } from "./projects.service"

@Controller("/api/projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ summary: "Create a new project" })
  @ApiCreatedResponse({ type: CreateProjectResponseDto })
  @Post()
  async create(@Req() req: AuthenticatedRequest, @Body() createProjectDto: CreateProjectDto) {
    const newProjectName = await this.projectsService.create(createProjectDto, req.user.userId)
    return { newProjectName }
  }

  @ApiOperation({ summary: "Retrieve all projects from a user" })
  @ApiOkResponse({ type: [GetProjectsResponseDto] })
  @Get()
  async findAll(@Req() req: AuthenticatedRequest) {
    return await this.projectsService.findAll(req.user.userId)
  }

  @ApiOperation({ summary: "Retrieve a single project along with its associated tasks from a user" })
  @ApiOkResponse({ type: GetProjectResponseDto })
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.projectsService.findOne(+id)
  }

  @ApiOperation({ summary: "Update a project" })
  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return await this.projectsService.update(+id, updateProjectDto)
  }

  @ApiOperation({ summary: "Delete a project" })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.projectsService.remove(+id)
  }
}

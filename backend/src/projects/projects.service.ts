import { BadRequestException, Inject, Injectable } from "@nestjs/common"
import { count, eq, getTableColumns } from "drizzle-orm"
import { NeonHttpDatabase } from "drizzle-orm/neon-http"
import { projects } from "drizzle/schema/projects"
import { tasks } from "drizzle/schema/tasks"
import { DATABASE_CONNECTION } from "src/drizzle/drizzle.constants"
import { CreateProjectDto } from "./dto/create-project.dto"
import { GetProjectResponseDto } from "./dto/get-project-response.dto"
import { GetProjectsResponseDto } from "./dto/get-projects-response.dto"
import { UpdateProjectDto } from "./dto/update-project.dto"

@Injectable()
export class ProjectsService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: NeonHttpDatabase) {}

  async create(createProjectDto: CreateProjectDto, userId: number) {
    const { name, colour } = createProjectDto
    const [{ name: newProjectName }] = await this.db
      .insert(projects)
      .values({ userId, name, colour })
      .returning({ name: projects.name })
    return newProjectName
  }

  async findAll(userId: number): Promise<GetProjectsResponseDto[]> {
    return await this.db
      .select({ ...getTableColumns(projects), taskCount: count(tasks.id) })
      .from(projects)
      .leftJoin(tasks, eq(projects.id, tasks.projectId))
      .where(eq(projects.userId, userId))
      .groupBy(projects.id)
  }

  async findOne(id: number): Promise<GetProjectResponseDto> {
    const [project] = await this.db.select({ projectName: projects.name }).from(projects).where(eq(projects.id, id))

    if (!project) {
      throw new BadRequestException(`Project with id ${id} not found`)
    }

    const associatedTasks = await this.db.select().from(tasks).where(eq(tasks.projectId, id))
    return { projectName: project.projectName, tasks: associatedTasks }
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const [updatedProject] = await this.db.update(projects).set(updateProjectDto).where(eq(projects.id, id)).returning()
    if (!updatedProject) {
      throw new BadRequestException(`Project with id ${id} not found`)
    }
    return
  }

  async remove(id: number) {
    const [deletedProject] = await this.db.delete(projects).where(eq(projects.id, id)).returning()
    if (!deletedProject) {
      throw new BadRequestException(`Project with id ${id} not found`)
    }
    return
  }
}

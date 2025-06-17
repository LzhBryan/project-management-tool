import { Inject, Injectable } from "@nestjs/common"
import { CreateTaskDto } from "./dto/create-task.dto"
import { UpdateTaskDto } from "./dto/update-task.dto"
import { NeonHttpDatabase } from "drizzle-orm/neon-http"
import { DATABASE_CONNECTION } from "src/drizzle/drizzle.constants"
import { Task, tasks } from "drizzle/schema/tasks"
import { eq } from "drizzle-orm"

@Injectable()
export class TasksService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: NeonHttpDatabase) {}

  async create(createTaskDto: CreateTaskDto, userId: number): Promise<{ taskName: string }> {
    const { name, description, dueDate, priority, projectId } = createTaskDto
    const [newTask] = await this.db
      .insert(tasks)
      .values({ name, description, priority, userId, projectId })
      .returning({ taskName: tasks.name })
    return newTask
  }

  async findAll(userId: number): Promise<Task[]> {
    return await this.db.select().from(tasks).where(eq(tasks.userId, userId))
  }

  async findOne(id: number) {
    return `This action returns a #${id} task`
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`
  }

  async remove(id: number) {
    return `This action removes a #${id} task`
  }
}

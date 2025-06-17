import { Inject, Injectable } from "@nestjs/common"
import * as bcrypt from "bcrypt"
import { eq } from "drizzle-orm"
import { NeonHttpDatabase } from "drizzle-orm/neon-http"
import { User, users } from "drizzle/schema/users"
import { DATABASE_CONNECTION } from "src/drizzle/drizzle.constants"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"

@Injectable()
export class UsersService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: NeonHttpDatabase) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto

    const hashedPassword = await bcrypt.hash(password, +process.env.SALT!)

    const [newUser] = await this.db.insert(users).values({ name, email, password: hashedPassword }).returning()
    return newUser
  }

  async findUser(email: string): Promise<User> {
    const [user] = await this.db.select().from(users).where(eq(users.email, email))
    return user
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  deleteUser(id: number) {
    return `This action deletes a #${id} user`
  }
}

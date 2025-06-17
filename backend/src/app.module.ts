import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { APP_GUARD } from "@nestjs/core"
import { AuthModule } from "./auth/auth.module"
import { JwtAccessAuthGuard } from "./auth/guards/jwt-access-auth.guard"
import { DrizzleModule } from "./drizzle/drizzle.module"
import { ProjectsModule } from "./projects/projects.module"
import { TasksModule } from "./tasks/tasks.module"
import { UsersModule } from "./users/users.module"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    AuthModule,
    ProjectsModule,
    TasksModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAccessAuthGuard,
    },
  ],
})
export class AppModule {}

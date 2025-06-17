import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { UsersModule } from "src/users/users.module"
import { PassportModule } from "@nestjs/passport"
import { LocalStrategy } from "./strategies/local.strategy"
import { JwtModule } from "@nestjs/jwt"
import { JwtAccessStrategy } from "./strategies/jwt-access.strategy"
import { JwtRefreshStrategy } from "./strategies/jwt-refresh.strategy"

@Module({
  imports: [UsersModule, PassportModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtAccessStrategy, JwtRefreshStrategy],
  exports: [AuthService],
})
export class AuthModule {}

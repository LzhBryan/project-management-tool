import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common"
import { Request, Response } from "express"
import { AuthService } from "./auth.service"
import { CreateUserDto } from "src/users/dto/create-user.dto"
import { LocalAuthGuard } from "./guards/local-auth.guard"
import { PublicRoute } from "./auth.decorator"
import { JwtRefreshAuthGuard } from "./guards/jwt-refresh-auth.guard"
import { AuthenticatedUser } from "./strategies/local.strategy"

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser
}

@Controller("api/auth/")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicRoute()
  @Post("register")
  async registerUser(@Body() registerUserDto: CreateUserDto, @Res() res: Response) {
    await this.authService.registerUser(registerUserDto, res)
    res.send("Successfully registered user")
  }

  @PublicRoute()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async loginUser(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    await this.authService.loginUser(req.user, res)
    res.send("Successfully login")
  }

  @PublicRoute()
  @UseGuards(JwtRefreshAuthGuard)
  @Get("refresh")
  refreshAccessToken(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    const payload = { email: req.user.email, sub: req.user.userId }
    this.authService.attachCookiesToResponse(res, payload)
    res.send("Successfully refresh token")
  }

  @Post("logout")
  logoutUser(@Res() res: Response) {
    this.authService.logoutUser(res)
    res.status(HttpStatus.NO_CONTENT).send("Successfully logout")
  }

  @Delete("delete")
  async deleteUser() {}
}

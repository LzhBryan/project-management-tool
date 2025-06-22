import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common"
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation } from "@nestjs/swagger"
import { Request, Response } from "express"
import { CreateUserDto } from "src/users/dto/create-user.dto"
import { PublicRoute } from "./auth.decorator"
import { AuthService } from "./auth.service"
import { JwtRefreshAuthGuard } from "./guards/jwt-refresh-auth.guard"
import { LocalAuthGuard } from "./guards/local-auth.guard"
import { AuthenticatedUser } from "./strategies/local.strategy"

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser
}

@Controller("api/auth/")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Register a new user" })
  @ApiCreatedResponse({ description: "Successfully registered a new user" })
  @ApiBadRequestResponse({ description: "User with email johnDoe@example.com already exists" })
  @PublicRoute()
  @Post("register")
  async registerUser(@Body() registerUserDto: CreateUserDto, @Res() res: Response) {
    await this.authService.registerUser(registerUserDto, res)
    res.send("Successfully registered a new user")
  }

  @ApiOperation({ summary: "Login a user" })
  @PublicRoute()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async loginUser(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    await this.authService.loginUser(req.user, res)
    res.send("Successfully login")
  }

  @ApiOperation({ summary: "Refresh access token of a user" })
  @PublicRoute()
  @UseGuards(JwtRefreshAuthGuard)
  @Get("refresh")
  refreshAccessToken(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    const payload = { email: req.user.email, sub: req.user.userId }
    this.authService.attachCookiesToResponse(res, payload)
    res.send("Successfully refresh token")
  }

  @ApiOperation({ summary: "Logout a user" })
  @Post("logout")
  logoutUser(@Res() res: Response) {
    this.authService.logoutUser(res)
    res.status(HttpStatus.NO_CONTENT).send("Successfully logout")
  }
}

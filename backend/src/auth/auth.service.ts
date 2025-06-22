import { BadRequestException, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"
import { User } from "drizzle/schema/users"
import { Response } from "express"
import { CreateUserDto } from "src/users/dto/create-user.dto"
import { UsersService } from "src/users/users.service"
import { AuthenticatedUser } from "./strategies/local.strategy"

export interface TokenPayload {
  email: string
  sub: number
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findUser(email)
    if (!user) {
      return null
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return null
    }

    return user
  }

  async registerUser(registerUserDto: CreateUserDto, res: Response) {
    const existingUser = await this.usersService.findUser(registerUserDto.email)

    if (existingUser) {
      throw new BadRequestException(`User with email ${registerUserDto.email} already exists`)
    }

    const newUser = await this.usersService.createUser(registerUserDto)
    this.attachCookiesToResponse(res, { email: newUser.email, sub: newUser.id })
  }

  async loginUser(user: AuthenticatedUser, res: Response) {
    const payload = { email: user.email, sub: user.userId }
    this.attachCookiesToResponse(res, payload)
  }

  logoutUser(res: Response) {
    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")
  }

  attachCookiesToResponse(res: Response, payload: TokenPayload) {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET!,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN!,
    })

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET!,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN!,
    })

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "PRODUCTION",
      signed: true,
      maxAge: +process.env.ACCESS_TOKEN_EXPIRES_IN!,
    })

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      signed: true,
      maxAge: +process.env.REFRESH_TOKEN_EXPIRES_IN!,
    })
  }
}

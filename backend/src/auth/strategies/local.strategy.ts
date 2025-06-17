import { Injectable, UnauthorizedException } from "@nestjs/common"
import { Strategy } from "passport-local"
import { AuthService } from "../auth.service"
import { PassportStrategy } from "@nestjs/passport"

export interface AuthenticatedUser {
  userId: number
  email: string
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: "email" })
  }

  async validate(email: string, password: string): Promise<AuthenticatedUser> {
    const user = await this.authService.validateUser(email, password)

    if (!user) {
      throw new UnauthorizedException("Invalid credentials")
    }

    return { userId: user.id, email: user.email }
  }
}

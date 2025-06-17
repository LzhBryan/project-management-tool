import { Request } from "express"
import { Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"
import { TokenPayload } from "../auth.service"

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => req.signedCookies.refreshToken,
      secretOrKey: process.env.REFRESH_TOKEN_SECRET!,
    })
  }

  async validate(payload: TokenPayload) {
    return { userId: payload.sub, email: payload.email }
  }
}

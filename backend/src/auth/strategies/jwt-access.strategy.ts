import { Request } from "express"
import { Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"
import { TokenPayload } from "../auth.service"

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, "jwt-access") {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => req.signedCookies.accessToken,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET!,
    })
  }

  async validate(payload: TokenPayload) {
    return { userId: payload.sub, email: payload.email }
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserJwtAuthPayload } from './payload/user-jwt-auth.payload';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: new ConfigService().getOrThrow('JWT_SECRET_TOKEN'),
    });
  }

  async validate(payload: UserJwtAuthPayload): Promise<UserJwtAuthPayload> {
    return { id: payload.id, username: payload.username };
  }
}

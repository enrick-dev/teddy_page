import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class FindOneUserResponsePayload extends OmitType(User, [
  'password',
] as const) {}

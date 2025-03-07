import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { SuccessMessages } from 'src/response-messages/success-messages';

class UserWithoutPassword extends OmitType(User, ['password'] as const) {}

export class CreateUserResponsePayload {
  @ApiProperty({
    description: 'Mensagem de sucesso',
    type: String,
    default: SuccessMessages.USER_CREATED,
    required: true,
  })
  message: string;
  @ApiProperty({
    description: 'Usuário criado',
    type: UserWithoutPassword,
    required: true,
  })
  user: UserWithoutPassword;
}

import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { SuccessMessages } from 'src/response-messages/success-messages';

class UserWithoutPassword extends OmitType(User, ['password'] as const) {}

export class UpdatedUserResponsePayload {
  @ApiProperty({
    description: 'Mensagem de sucesso',
    type: String,
    default: SuccessMessages.USER_UPDATED,
    required: true,
  })
  message: string;
  @ApiProperty({
    description: 'Usuário atualizado',
    type: UserWithoutPassword,
    required: true,
  })
  user: UserWithoutPassword;
}

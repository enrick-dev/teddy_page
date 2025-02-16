import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { SuccessMessages } from 'src/response-messages/success-messages';

class UserWithoutPassword extends OmitType(User, ['password'] as const) {}

export class DeletedUserResponsePayload {
  @ApiProperty({
    description: 'Mensagem de sucesso',
    type: String,
    default: SuccessMessages.USER_DELETED,
    required: true,
  })
  message: string;
  @ApiProperty({
    description: 'Usuário deletado',
    type: UserWithoutPassword,
    required: true,
  })
  user: UserWithoutPassword;
}

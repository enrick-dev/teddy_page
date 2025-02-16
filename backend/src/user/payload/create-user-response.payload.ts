import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';

class User extends OmitType(CreateUserDto, ['password'] as const) {}

export class CreateUserResponsePayload {
  @ApiProperty({
    description: 'Mensagem de sucesso',
    type: String,
    default: 'Usuário criado com sucesso',
    required: true,
  })
  message: string;
  @ApiProperty({
    description: 'Usuário criado',
    type: User,
    required: true,
  })
  user: User;
}

import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

class UserWithoutPassword extends OmitType(User, ['password'] as const) {}

export class FindManyUserResponsePayload {
  @ApiProperty({
    description: 'Usuários',
    type: UserWithoutPassword,
    isArray: true,
  })
  users: UserWithoutPassword[];
  @ApiProperty({
    description: 'Total de usuários',
    example: 1,
  })
  totalUsers: number;
  @ApiProperty({
    description: 'Total de páginas',
    example: 1,
  })
  totalPages: number;
  @ApiProperty({
    description: 'Página atual',
    example: 1,
  })
  currentPage: number;
  @ApiProperty({
    description: 'Limite de usuários por página',
    example: 10,
  })
  limit: number;
}

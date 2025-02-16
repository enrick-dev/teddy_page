import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    type: String,
    default: 'John Doe',
    maxLength: 120,
    minLength: 3,
    required: true,
  })
  @MaxLength(120)
  @MinLength(3)
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Usuário de acesso',
    type: String,
    default: 'johndoe',
    maxLength: 30,
    minLength: 3,
    required: true,
  })
  @MaxLength(30)
  @MinLength(3)
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Senha de acesso',
    type: String,
    default: '123456',
    maxLength: 18,
    minLength: 3,
    required: true,
  })
  @MaxLength(18)
  @MinLength(3)
  @IsString()
  password: string;
}

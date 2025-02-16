import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({
    description: 'Username',
    example: 'johndoe',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Password',
    example: '123456',
  })
  @IsNotEmpty()
  password: string;
}

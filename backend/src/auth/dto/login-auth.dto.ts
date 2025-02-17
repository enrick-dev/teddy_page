import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ErrorMessages } from 'src/response-messages/error-messages';

export class LoginAuthDto {
  @ApiProperty({
    description: 'Username',
    example: 'johndoe',
  })
  @IsNotEmpty({ message: ErrorMessages.USERNAME_CANNOT_BE_EMPTY })
  username: string;

  @ApiProperty({
    description: 'Password',
    example: '123456',
  })
  @IsNotEmpty({ message: ErrorMessages.PASSWORD_CANNOT_BE_EMPTY })
  password: string;
}

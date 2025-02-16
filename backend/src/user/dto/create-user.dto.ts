import { IsString, MaxLength, MinLength } from 'class-validator';
export class CreateUserDto {
  @MaxLength(120)
  @MinLength(3)
  @IsString()
  name: string;

  @MaxLength(30)
  @MinLength(3)
  @IsString()
  username: string;

  @MaxLength(18)
  @MinLength(3)
  @IsString()
  password: string;
}

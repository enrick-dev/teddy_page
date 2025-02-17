import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ClearClientDto {
  @ApiProperty({
    description: 'ID do usuário',
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  userID: number;
}

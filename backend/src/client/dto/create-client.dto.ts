import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    description: 'Nome do cliente',
    type: String,
    default: 'Enrick Santos',
    maxLength: 60,
    required: true,
  })
  @MaxLength(60)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Valor da empresa',
    type: Number,
    default: 12000000,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  companyValue: number;

  @ApiProperty({
    description: 'Salário',
    type: Number,
    default: 350000,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  salary: number;

  @ApiProperty({
    description: 'Usuário vinculado ao cliente',
    type: Number,
    default: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  userID: number;

  @ApiProperty({
    description: 'Selecionado',
    type: Boolean,
    default: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  selected?: boolean;
}

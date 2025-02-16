import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class CreateClientDto {
  @MaxLength(60)
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  companyValue: number;

  @IsNumber()
  @IsNotEmpty()
  salary: number;
}

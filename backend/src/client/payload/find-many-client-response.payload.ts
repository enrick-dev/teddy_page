import { ApiProperty } from '@nestjs/swagger';
import { Client } from '../entities/client.entity';

export class FindManyClientResponsePayload {
  @ApiProperty({
    description: 'clientes',
    type: Client,
    isArray: true,
  })
  clients: Client[];
  @ApiProperty({
    description: 'Total de clientes',
    example: 1,
  })
  totalClients: number;
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
    description: 'Limite de clientes por página',
    example: 10,
  })
  limit: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { SuccessMessages } from 'src/response-messages/success-messages';
import { Client } from '../entities/client.entity';

export class UpdatedClientResponsePayload {
  @ApiProperty({
    description: 'Mensagem de sucesso',
    type: String,
    default: SuccessMessages.CLIENT_UPDATED,
    required: true,
  })
  message: string;
  @ApiProperty({
    description: 'Cliente atualizado',
    type: Client,
    required: true,
  })
  client: Client;
}

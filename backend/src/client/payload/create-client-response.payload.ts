import { ApiProperty } from '@nestjs/swagger';
import { SuccessMessages } from 'src/response-messages/success-messages';
import { Client } from '../entities/client.entity';

export class CreateClientResponsePayload {
  @ApiProperty({
    description: 'Mensagem de sucesso',
    type: String,
    default: SuccessMessages.CLIENT_CREATED,
    required: true,
  })
  message: string;
  @ApiProperty({
    description: 'Cliente criado',
    type: Client,
    required: true,
  })
  client: Client;
}

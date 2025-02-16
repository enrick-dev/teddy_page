import { ApiProperty } from '@nestjs/swagger';
import { SuccessMessages } from 'src/response-messages/success-messages';
import { Client } from '../entities/client.entity';

export class DeletedClientResponsePayload {
  @ApiProperty({
    description: 'Mensagem de sucesso',
    type: String,
    default: SuccessMessages.CLIENT_DELETED,
    required: true,
  })
  message: string;
  @ApiProperty({
    description: 'Cliente deletado',
    type: Client,
    required: true,
  })
  client: Client;
}

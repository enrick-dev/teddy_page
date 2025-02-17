import { ApiProperty } from '@nestjs/swagger';
import { SuccessMessages } from 'src/response-messages/success-messages';

export class ClearSelectedClientResponsePayload {
  @ApiProperty({
    description: 'Mensagem de sucesso',
    type: String,
    default: SuccessMessages.REMOVE_SELECTION_ALL_CLIENTS,
    required: true,
  })
  message: string;
}

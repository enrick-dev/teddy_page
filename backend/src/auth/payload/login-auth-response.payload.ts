import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthResponsePayload {
  @ApiProperty({
    description: 'Token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiJ9.5L9Z0l5gkZo6J3Xwz8tYzB5KQ3wQg6o6X3a1zJQY7gM',
  })
  token: string;
}

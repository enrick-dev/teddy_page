import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { IsPublic } from './decorators/is-public.decorator';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginAuthResponsePayload } from './payload/login-auth-response.payload';
import { ErrorMessages } from 'src/response-messages/error-messages';
import { FindOneUserResponsePayload } from 'src/user/payload/find-one-user-response.payload';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post()
  @ApiOperation({
    summary: 'Autenticação de usuário',
  })
  @ApiCreatedResponse({ description: 'Login', type: LoginAuthResponsePayload })
  @ApiNotFoundResponse({ description: ErrorMessages.USERNAME_NOT_FOUND })
  @ApiUnauthorizedResponse({ description: ErrorMessages.INVALID_PASSWORD })
  async login(
    @Body() loginAuthDto: LoginAuthDto,
  ): Promise<LoginAuthResponsePayload> {
    return this.authService.login(loginAuthDto);
  }

  @Get(':token')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obter dados do usuário por token',
  })
  @ApiQuery({
    name: 'token',
    description: 'Token do usuário',
    type: String,
    required: true,
  })
  @ApiCreatedResponse({
    description: 'Usuário',
    type: FindOneUserResponsePayload,
  })
  @ApiUnauthorizedResponse({ description: ErrorMessages.INVALID_TOKEN })
  @ApiNotFoundResponse({ description: ErrorMessages.USER_NOT_FOUND })
  getUserByToken(
    @Param('token') token: string,
  ): Promise<FindOneUserResponsePayload> {
    return this.authService.getUserByToken(token);
  }
}

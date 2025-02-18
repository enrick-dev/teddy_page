import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { IsPublic } from './decorators/is-public.decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginAuthResponsePayload } from './payload/login-auth-response.payload';
import { ErrorMessages } from 'src/response-messages/error-messages';
import { FindOneUserResponsePayload } from 'src/user/payload/find-one-user-response.payload';
import { RegisterUserDto } from './dto/register-user-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post()
  @ApiOperation({
    summary: 'Autenticação de usuário',
  })
  @ApiCreatedResponse({ description: 'Login', type: LoginAuthResponsePayload })
  @ApiConflictResponse({ description: ErrorMessages.USER_ALREADY_EXISTS })
  @ApiNotFoundResponse({ description: ErrorMessages.USERNAME_NOT_FOUND })
  @ApiUnauthorizedResponse({ description: ErrorMessages.INVALID_PASSWORD })
  async login(
    @Body() loginAuthDto: LoginAuthDto,
  ): Promise<LoginAuthResponsePayload> {
    return this.authService.login(loginAuthDto);
  }

  @IsPublic()
  @Post('register')
  @ApiOperation({
    summary: 'Criar usuário e retornar um token',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: 'Login', type: LoginAuthResponsePayload })
  @ApiBadRequestResponse({ description: ErrorMessages.INTERNAL_USER_CREATE })
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
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

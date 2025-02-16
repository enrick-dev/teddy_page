import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

import { ErrorMessages } from 'src/response-messages/error-messages';
import { SuccessMessages } from 'src/response-messages/success-messages';
import { FindManyUserResponsePayload } from './payload/find-many-user-response.payload';
import { FindOneUserResponsePayload } from './payload/find-one-user-response.payload';
import { DeletedUserResponsePayload } from './payload/deleted-user-response.payload';
import { UpdatedUserResponsePayload } from './payload/updated-user-response.payload';
import { CreateUserResponsePayload } from './payload/create-user-response.payload';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar usuário',
  })
  @ApiCreatedResponse({
    description: SuccessMessages.USER_CREATED,
    type: CreateUserResponsePayload,
  })
  @ApiConflictResponse({ description: ErrorMessages.USER_ALREADY_EXISTS })
  create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponsePayload> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar usuários',
  })
  @ApiQuery({
    name: 'page',
    description: 'Página',
    type: Number,
    required: true,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Limite de usuários por página',
    type: Number,
    required: true,
  })
  @ApiCreatedResponse({
    type: FindManyUserResponsePayload,
  })
  @ApiBadRequestResponse({
    description: ErrorMessages.PAGE_AND_LIMIT_REQUIRED,
  })
  findAll(@Query('page') page: string, @Query('limit') limit: string) {
    if (!page || !limit) {
      throw new BadRequestException(ErrorMessages.PAGE_AND_LIMIT_REQUIRED);
    }

    return this.userService.findAll(+page, +limit);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar usuário',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    type: Number,
    required: true,
  })
  @ApiCreatedResponse({
    type: FindOneUserResponsePayload,
  })
  @ApiNotFoundResponse({ description: ErrorMessages.USER_NOT_FOUND })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar usuário',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    type: Number,
    required: true,
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiCreatedResponse({
    type: UpdatedUserResponsePayload,
  })
  @ApiNotFoundResponse({ description: ErrorMessages.USER_NOT_FOUND })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdatedUserResponsePayload> {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover usuário',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    type: Number,
    required: true,
  })
  @ApiCreatedResponse({
    type: DeletedUserResponsePayload,
  })
  @ApiNotFoundResponse({ description: ErrorMessages.USER_NOT_FOUND })
  remove(@Param('id') id: string): Promise<DeletedUserResponsePayload> {
    return this.userService.remove(+id);
  }
}

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
  ApiConflictResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { CreateUserResponsePayload } from './payload/create-user-response.payload';
import { ErrorMessages } from 'src/response-messages/error-messages';
import { SuccessMessages } from 'src/response-messages/success-messages';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
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
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

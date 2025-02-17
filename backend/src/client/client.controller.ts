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
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ErrorMessages } from 'src/response-messages/error-messages';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { SuccessMessages } from 'src/response-messages/success-messages';
import { CreateClientResponsePayload } from './payload/create-client-response.payload';
import { FindManyClientResponsePayload } from './payload/find-many-client-response.payload';
import { UpdatedClientResponsePayload } from './payload/updated-client-response.payload';
import { FindOneClientResponsePayload } from './payload/find-one-client-response.payload';
import { DeletedClientResponsePayload } from './payload/deleted-client-response.payload';

@ApiBearerAuth()
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar cliente',
  })
  @ApiCreatedResponse({
    description: SuccessMessages.CLIENT_CREATED,
    type: CreateClientResponsePayload,
  })
  create(
    @Body() createClientDto: CreateClientDto,
  ): Promise<CreateClientResponsePayload> {
    return this.clientService.create(createClientDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar clientes',
  })
  @ApiQuery({
    name: 'selected',
    description: 'Selecionado',
    type: Boolean,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    description: 'Página',
    type: Number,
    required: true,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Limite de clientes por página',
    type: Number,
    required: true,
  })
  // @ApiQuery({
  //   name: 'minSalary',
  //   description: 'Valor minimo de salário',
  //   type: Number,
  //   required: false,
  // })
  // @ApiQuery({
  //   name: 'maxSalary',
  //   description: 'Valor maximo de salário',
  //   type: Number,
  //   required: false,
  // })
  // @ApiQuery({
  //   name: 'minCompanyValue',
  //   description: 'Minimo valor da empresa',
  //   type: Number,
  //   required: false,
  // })
  // @ApiQuery({
  //   name: 'maxCompanyValue',
  //   description: 'Maximo valor da empresa',
  //   type: Number,
  //   required: false,
  // })
  @ApiCreatedResponse({
    type: FindManyClientResponsePayload,
  })
  @ApiBadRequestResponse({
    description: ErrorMessages.PAGE_AND_LIMIT_REQUIRED,
  })
  findAll(
    // @Query('minSalary') minSalary: string,
    // @Query('maxSalary') maxSalary: string,
    // @Query('minCompanyValue') minCompanyValue: string,
    // @Query('maxCompanyValue') maxCompanyValue: string,
    @Query('selected') selected: boolean,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<FindManyClientResponsePayload> {
    if (!page || !limit) {
      throw new BadRequestException(ErrorMessages.PAGE_AND_LIMIT_REQUIRED);
    }

    return this.clientService.findAll(
      // +minSalary,
      // +maxSalary,
      // +minCompanyValue,
      // +maxCompanyValue,
      selected,
      +page,
      +limit,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar cliente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do cliente',
    type: Number,
    required: true,
  })
  @ApiCreatedResponse({
    type: FindOneClientResponsePayload,
  })
  @ApiNotFoundResponse({ description: ErrorMessages.CLIENT_NOT_FOUND })
  findOne(@Param('id') id: string): Promise<FindOneClientResponsePayload> {
    return this.clientService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar cliente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do cliente',
    type: Number,
    required: true,
  })
  @ApiBody({
    type: CreateClientDto,
  })
  @ApiCreatedResponse({
    type: UpdatedClientResponsePayload,
  })
  @ApiNotFoundResponse({ description: ErrorMessages.CLIENT_NOT_FOUND })
  update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<UpdatedClientResponsePayload> {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover cliente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do cliente',
    type: Number,
    required: true,
  })
  @ApiCreatedResponse({
    type: DeletedClientResponsePayload,
  })
  @ApiNotFoundResponse({ description: ErrorMessages.CLIENT_NOT_FOUND })
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}

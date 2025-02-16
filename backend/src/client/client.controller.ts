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

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  findAll(
    @Query('minSalary') minSalary: string,
    @Query('maxSalary') maxSalary: string,
    @Query('minCompanyValue') minCompanyValue: string,
    @Query('maxCompanyValue') maxCompanyValue: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    if (!page || !limit) {
      throw new BadRequestException(
        'Page and limit query parameters are required',
      );
    }

    return this.clientService.findAll(
      +minSalary,
      +maxSalary,
      +minCompanyValue,
      +maxCompanyValue,
      +page,
      +limit,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, Repository } from 'typeorm';
import { SuccessMessages } from 'src/response-messages/success-messages';
import { ErrorMessages } from 'src/response-messages/error-messages';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  private buildRangeCondition(
    min: number,
    max: number,
    field: keyof Client,
  ): FindOptionsWhere<Client> {
    if (min && max) {
      return { [field]: Between(min, max) };
    } else if (min) {
      return { [field]: min };
    } else if (max) {
      return { [field]: max };
    }
    return {};
  }

  async create(createClientDto: CreateClientDto) {
    const clientInstance = this.clientRepository.create(createClientDto);
    const client = await this.clientRepository.save(clientInstance);

    return { message: SuccessMessages.CLIENT_CREATED, client };
  }

  async findAll(
    // minSalary: number,
    // maxSalary: number,
    // minCompanyValue: number,
    // maxCompanyValue: number,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;

    // const salaryCondition = this.buildRangeCondition(
    //   minSalary,
    //   maxSalary,
    //   'salary',
    // );
    // const companyValueCondition = this.buildRangeCondition(
    //   minCompanyValue,
    //   maxCompanyValue,
    //   'companyValue',
    // );

    const where: FindOptionsWhere<Client> = {
      // ...salaryCondition,
      // ...companyValueCondition,
    };

    const clients = await this.clientRepository.find({
      where,
      skip,
      take: limit,
    });

    const clientsCount = await this.clientRepository.count({ where });

    return {
      clients,
      totalClients: clientsCount,
      totalPages: Math.ceil(clientsCount / limit),
      currentPage: page,
      limit,
    };
  }

  async findOne(id: number) {
    const client = await this.clientRepository.findOne({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException(ErrorMessages.CLIENT_NOT_FOUND);
    }

    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const updatedClient = await this.clientRepository.update(
      id,
      updateClientDto,
    );
    if (!updatedClient.affected) {
      throw new NotFoundException(ErrorMessages.CLIENT_NOT_FOUND);
    }

    const client = await this.clientRepository.findOne({
      where: { id },
    });

    return { message: SuccessMessages.CLIENT_UPDATED, client };
  }

  async remove(id: number) {
    const client = await this.clientRepository.findOne({ where: { id } });

    if (!client) {
      throw new NotFoundException(ErrorMessages.CLIENT_NOT_FOUND);
    }

    const clientDeleted = await this.clientRepository.remove(client);
    return { message: SuccessMessages.CLIENT_DELETED, client: clientDeleted };
  }
}

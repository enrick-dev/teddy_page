import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, Repository } from 'typeorm';

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

    return { message: 'Client created successfully', client };
  }

  async findAll(
    minSalary: number,
    maxSalary: number,
    minCompanyValue: number,
    maxCompanyValue: number,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;

    const salaryCondition = this.buildRangeCondition(
      minSalary,
      maxSalary,
      'salary',
    );
    const companyValueCondition = this.buildRangeCondition(
      minCompanyValue,
      maxCompanyValue,
      'companyValue',
    );

    const where: FindOptionsWhere<Client> = {
      ...salaryCondition,
      ...companyValueCondition,
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

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}

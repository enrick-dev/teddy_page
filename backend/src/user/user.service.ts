import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserResponsePayload } from './payload/create-user-response.payload';
import { SuccessMessages } from 'src/response-messages/success-messages';
import { ErrorMessages } from 'src/response-messages/error-messages';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create({
    password,
    ...restCreateUserDto
  }: CreateUserDto): Promise<CreateUserResponsePayload> {
    const existingUser = await this.userRepository.findOne({
      where: { username: restCreateUserDto.username },
    });

    if (existingUser) {
      throw new ConflictException(ErrorMessages.USER_ALREADY_EXISTS);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    const userInstance = this.userRepository.create({
      password: hashPassword,
      ...restCreateUserDto,
    });
    const { password: _, ...user } =
      await this.userRepository.save(userInstance);

    return { message: SuccessMessages.USER_CREATED, user };
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const users = await this.userRepository.find({
      select: ['id', 'name', 'username'],
      skip,
      take: limit,
    });

    const usersCount = await this.userRepository.count();

    return {
      users,
      totalUsers: usersCount,
      totalPages: Math.ceil(usersCount / limit),
      currentPage: page,
      limit,
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      select: ['id', 'name', 'username'],
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);
    }

    return user;
  }

  async update(id: number, { password, ...restUpdateUserDto }: UpdateUserDto) {
    let newPassword: string;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hashSync(password, salt);
      newPassword = hash;
    }

    const updatedUser = await this.userRepository.update(id, {
      ...restUpdateUserDto,
      password: newPassword,
    });
    if (!updatedUser.affected) {
      throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);
    }

    const { password: _, ...user } = await this.userRepository.findOne({
      where: { id },
    });

    return { message: SuccessMessages.USER_UPDATED, user };
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);
    }

    const { password: _, ...userDeleted } =
      await this.userRepository.remove(user);
    return { message: SuccessMessages.USER_DELETED, user: userDeleted };
  }
}

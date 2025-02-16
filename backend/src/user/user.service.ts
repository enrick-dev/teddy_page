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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const userInstance = this.userRepository.create(createUserDto);
    const { password: _, ...user } =
      await this.userRepository.save(userInstance);

    return { message: 'User created successfully', user };
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
    return await this.userRepository.findOne({ where: { id } });
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
      throw new NotFoundException('User not found');
    }

    const { password: _, ...user } = await this.userRepository.findOne({
      where: { id },
    });

    return { message: 'User updated successfully', user };
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password: _, ...userDeleted } =
      await this.userRepository.remove(user);
    return { message: 'User deleted successfully', user: userDeleted };
  }
}

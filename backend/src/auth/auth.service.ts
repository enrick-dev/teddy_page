import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserJwtAuthPayload } from './payload/user-jwt-auth.payload';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.userRepository.findOne({
      where: { username: loginAuthDto.username },
    });
    if (!user) {
      throw new NotFoundException('No user found for username');
    }

    const isPasswordValid = await bcrypt.compare(
      loginAuthDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new NotFoundException('Password is incorrect');
    }

    return {
      token: this.jwtService.sign({ id: user.id, username: user.username }),
    };
  }

  async getUserByToken(token: string) {
    const JWT_SECRET_TOKEN = new ConfigService().getOrThrow('JWT_SECRET_TOKEN');
    const isValidToken = this.jwtService.verify(token, JWT_SECRET_TOKEN);

    if (!isValidToken) {
      throw new UnauthorizedException('Invalid token');
    }

    const decoded: UserJwtAuthPayload = await this.jwtService.decode(
      token,
      JWT_SECRET_TOKEN,
    );

    const user = await this.userService.findOne(decoded.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}

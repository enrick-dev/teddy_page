import { ApiProperty } from '@nestjs/swagger';
import { Client } from 'src/client/entities/client.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({
    description: 'Id',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Nome',
    example: 'John Doe',
    maxLength: 120,
  })
  @Column({ length: 120 })
  name: string;

  @ApiProperty({
    description: 'Username',
    example: 'johndoe',
  })
  @Column({ length: 30, unique: true })
  username: string;

  @ApiProperty({
    description: 'Password',
    example: '123456',
  })
  @Column()
  password: string;

  @ApiProperty({
    description: 'Data de criação',
    example: '2021-07-01T00:00:00.000Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização',
    example: '2021-07-01T00:00:00.000Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Client, (client) => client.user)
  clients: Client[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Client {
  @ApiProperty({
    description: 'Id',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Nome',
    example: 'Enrick Santos',
    maxLength: 60,
  })
  @Column({ length: 60 })
  name: string;

  @ApiProperty({
    description: 'Valor da empresa',
    type: Number,
    default: 12000000,
    required: true,
  })
  @Column()
  companyValue: number;

  @ApiProperty({
    description: 'Salário',
    type: Number,
    default: 350000,
    required: true,
  })
  @Column()
  salary: number;

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

  @ApiProperty({
    description: 'Usuário vinculado ao cliente',
    type: Number,
    default: 1,
    required: true,
  })
  @Column()
  userID: number;

  @ManyToOne(() => User, (user) => user.clients)
  user: User;

  constructor(partial: Partial<Client>) {
    Object.assign(this, partial);
  }
}

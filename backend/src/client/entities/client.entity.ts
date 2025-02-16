import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;

  @Column()
  companyValue: number;

  @Column()
  salary: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  userID: number;

  @ManyToOne(() => User, (user) => user.clients)
  user: User;

  constructor(partial: Partial<Client>) {
    Object.assign(this, partial);
  }
}

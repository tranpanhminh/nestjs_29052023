import { Injectable } from '@nestjs/common';
import { UsersEntity } from './database/entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  @InjectRepository(UsersEntity)
  private usersRepository: Repository<UsersEntity>;

  async getUsers(): Promise<UsersEntity[]> {
    return this.usersRepository.find();
  }
}
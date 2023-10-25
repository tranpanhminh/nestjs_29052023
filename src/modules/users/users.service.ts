import { Injectable } from '@nestjs/common';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  @InjectRepository(Users)
  private usersRepository: Repository<Users>;

  async getUsers(): Promise<Users[]> {
    return this.usersRepository.find();
  }
}

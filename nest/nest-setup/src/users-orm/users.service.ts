import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  createUser(payload: User): Promise<User> {
    const newUser = this.usersRepository.create({
      ...payload,
    });

    return this.usersRepository.save(newUser);
  }

  findAllUser(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneUser(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User } from './user.entity';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() body: User): Promise<User> {
    return this.usersService.createUser(body);
  }

  @Get()
  findAllUser(): Promise<User[]> {
    return this.usersService.findAllUser();
  }

  @Get('/:userId')
  findOneUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.findOneUser(userId);
  }

  @Delete('/:userId')
  deleteUser(@Param('userId') userId: string): Promise<void> {
    return this.usersService.deleteUser(userId);
  }
}

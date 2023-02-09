import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {

  constructor(
    private readonly userService: UserService
  ){}

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto
  ): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }
}

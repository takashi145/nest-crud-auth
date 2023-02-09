import { Body, ClassSerializerInterceptor, Controller, Get, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
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

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser(
    @Req() req: { user: User }
  ): Promise<User> {
    return await this.userService.getUser(req.user.email);
  }
}

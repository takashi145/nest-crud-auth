import { ClassSerializerInterceptor, Controller, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guards';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ){}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: { user: User }
  ): Promise<{ accessToken: string }> {
    return this.authService.login(req.user);
  }
}

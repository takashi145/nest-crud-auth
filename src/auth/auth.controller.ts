import { ClassSerializerInterceptor, Controller, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request, response, Response } from 'express';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
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
    @Req() request: { user: User },
    @Res({ passthrough: true }) res: Response
  ): Promise<{ accessToken: string }> {

    const accessToken = await this.authService.createAccessToken(request.user);

    const { refreshToken } = await this.authService.createRefreshToken(request.user);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return accessToken;
  }

  @Post('refresh')
  async refresh(@Req() request: Request): Promise<{ accessToken: string }> {
    const refresh_token = request.cookies['refresh_token'];
    return await this.authService.refresh(refresh_token);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(
    @Req() req: { user: User },
    @Res({ passthrough: true }) response: Response
  ): Promise<void> {
    await this.authService.logout(req.user.id);
    response.clearCookie('refresh_token');
  }
}

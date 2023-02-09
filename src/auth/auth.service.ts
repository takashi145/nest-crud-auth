import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import * as bcypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './types/jwtPayload.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ){}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUser(email);

    if(user && await bcypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(
    user: User
  ): Promise<{ accessToken: string }> {
    const payload: JwtPayload = { email: user.email, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}

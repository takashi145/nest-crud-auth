import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password, password_confirmation } = createUserDto;

    const user = await this.userRepository.findOneBy({ email });
 
    if(user) {
      throw new BadRequestException('email already exists');
    }

    if (password !== password_confirmation) {
      throw new BadRequestException('password do not match');
    }

    const salt = await bcypt.genSalt();
    const hashdPassword = await bcypt.hash(password, salt);

    const new_user =  this.userRepository.create({
      username,
      email,
      password: hashdPassword
    });

    await this.userRepository.save(new_user);

    return new_user;
  }

  async getUser(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async updateRefreshToken(
    user_id: User['id'], 
    refresh_token: User['refresh_token']
  ) {
    try {
      if(refresh_token) {
        const salt = await bcypt.genSalt(10);
        const hashedRefreshToken = await bcypt.hash(refresh_token, salt);
        await this.userRepository.update(user_id, {
          refresh_token: hashedRefreshToken,
        });
      }else {
        await this.userRepository.update(user_id, {
          refresh_token: null
        });
      }
      return true;
    }catch(e) {
      return false;
    }
  }
}

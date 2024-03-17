import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signup(
    email: string,
    name: string,
    nickname: string,
    password: string,
  ) {
    const newuser = await this.usersRepository.findOne({ where: { email } });
    if (newuser) {
      throw new UnauthorizedException('이미 존재하는 사용자입니다.');
      return;
    } else {
      const hashedpassword = await bcrypt.hash(password, 12);
      await this.usersRepository.save({
        id: uuid(),
        email,
        name,
        nickname,
        password: hashedpassword,
      });
    }
  }

  async findOne(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }
}

import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/registerUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(registerUserDto: RegisterDto) {
    const { fname, email, password, lname } = registerUserDto;
    try {
      return await this.userModel.create({
        fname,
        lname,
        email,
        password,
      });
    } catch (error) {
      const e = error as { code?: number };
      if (e.code === 11000) {
        throw new ConflictException('Email is already taken');
      } 

      throw error;
    }
  }
}

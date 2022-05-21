import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';
import * as crypto from 'crypto';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDTO): Promise<User> {
    const existingUser = await this.userModel.find({
      username: createUserDto.username,
    });

    if (existingUser && existingUser.length > 0)
      throw new HttpException('EXISTING_USER', HttpStatus.CONFLICT);

    const password = crypto
      .createHmac('sha256', createUserDto.password)
      .digest('hex');

    const createdUser = new this.userModel({
      name: createUserDto.name,
      username: createUserDto.username,
      password,
    });

    return await createdUser.save();
  }

  async login(loginDto: LoginDTO) {
    const password = crypto
      .createHmac('sha256', loginDto.password)
      .digest('hex');

    const payload = await this.userModel.findOne({
      username: loginDto.username,
      password,
    });

    if (!payload)
      throw new HttpException('INVALID_CREDENTIALS', HttpStatus.FORBIDDEN);

    const accessToken = this.jwtService.sign({
      id: payload._id,
      name: payload.name,
      username: payload.username,
    });

    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  async getUserByUsername(username: string) {
    return await this.userModel.findOne({
      username,
    });
  }
}

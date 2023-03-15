import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-auth.dto';
import { User } from '../users/models/user.model';
import { Response } from 'express';
import { uuid as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registration(userDto: CreateUserDto, res: Response) {
    const userIsExist = await this.userService.getUserByUsername(
      userDto.username,
    );
    if (userIsExist) {
      throw new HttpException(`Bunday user mavjud`, HttpStatus.BAD_REQUEST);
    }
    if (userDto.password != userDto.confirm_password) {
      throw new BadRequestException(`Password does not match`);
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 7);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashedPassword,
    });
    const tokens = await this.getToken(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const uniqueKey: string = uuidv4();

    const updatedUser = this.userService.updateUser(user.id, {
      ...user,
      hashed_refresh_token: hashed_refresh_token,
      activation_link: uniqueKey,
    });

    // res.cookie('refresh_token', tokens.refresh_token, {
    //   maxAge: 15 * 24 * 60 * 60 * 1000,
    //   httpOnly: true,
    // });

    const response = {
      message: 'USER REGISTERED',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new HttpException(`Bunday user mavjud emas`, HttpStatus.NOT_FOUND);
    }
    return this.getToken(user);
  }

  private async getToken(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };
    let getSignToken = () =>
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      });
    const [accessToken, refreshToken] = await Promise.all([
      getSignToken(),
      getSignToken(),
    ]);
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  private async validateUser(loginDto: LoginDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Email yoki password XATO !!!');
    }

    return user;
  }
}

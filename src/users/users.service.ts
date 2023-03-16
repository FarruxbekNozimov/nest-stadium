import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ActivateUserDto } from './dto/activate-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepo: typeof User) {}

  async createUser(createUserDto: CreateUserDto, hashed_password: string) {
    const newUser = await this.userRepo.create({
      ...createUserDto,
      hashed_password,
    });
    return newUser;
  }

  async getAllUsers() {
    const users = await this.userRepo.findAll({ include: { all: true } });
    return users.sort((a, b) => a.id - b.id);
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepo.findOne({
      where: { username },
      include: { all: true },
    });
    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepo.findByPk(id);
    return user;
  }

  async updateUser(id: number, updatedUser: UpdateUserDto) {
    const user = await this.userRepo.update(updatedUser, {
      where: { id },
      returning: true,
    });
    return user;
  }

  async deleteUser(id: number): Promise<number> {
    const result = await this.userRepo.destroy({ where: { id } });
    return result;
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link is expired');
    }
    const updatedUser = await this.userRepo.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );

    if (!updatedUser[1][0]) {
      throw new BadRequestException('User already activated');
    }

    const response = {
      message: 'User activated successfully',
      user: updatedUser,
    };
    return response;
  }

  async deactivate(activateUserDto: ActivateUserDto) {
    const user = await this.userRepo.findByPk(activateUserDto.userId);
    if (!user) {
      throw new HttpException('Foydalanuvchi  topilmadi', HttpStatus.NOT_FOUND);
    }
    user.is_active = false;
    await user.save();
    return user;
  }
}

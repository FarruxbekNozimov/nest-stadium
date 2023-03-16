import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './models/user.model';
import { CookieGetter } from '../decorators/cookieGetter.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a user' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto, createUserDto.password);
  }

  @ApiOperation({ summary: 'Get all users' })
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(+id);
  }

  @ApiOperation({ summary: 'Update user by ID' })
  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() userData: UpdateUserDto) {
    return await this.usersService.updateUser(+id, userData);
  }

  @ApiOperation({ summary: 'Delete user by ID' })
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<number> {
    return await this.usersService.deleteUser(id);
  }

  @ApiOperation({ summary: 'Activate User' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    console.log(link);
    return this.usersService.activate(link);
  }

}

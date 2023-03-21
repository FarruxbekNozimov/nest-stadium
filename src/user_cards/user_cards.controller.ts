import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserCardService } from './user_cards.service';
import { UpdateUserCardDto } from './dto/update-user_card.dto';
import { CreateCartDto } from '../cart/dto/create-cart.dto';

@ApiTags('User Cards')
@Controller('user-cards')
export class UserCardController {
  constructor(private readonly userCardService: UserCardService) {}

  @ApiOperation({ summary: 'Create a user-cards' })
  @Post()
  createComfort(@Body() CreateCartDto: CreateCartDto) {
    return this.userCardService.createUserCard(CreateCartDto);
  }

  @ApiOperation({ summary: 'Get all user-cards' })
  @Get()
  getAllComforts() {
    return this.userCardService.getAllUserCards();
  }

  @ApiOperation({ summary: 'Get user-cards' })
  @Get(':id')
  getComfortById(@Param('id') id: string) {
    return this.userCardService.getUserCardById(+id);
  }

  @ApiOperation({ summary: 'Update user-cards' })
  @Put(':id')
  async updateComfort(
    @Param('id') id: number,
    @Body() updateUserCardDto: UpdateUserCardDto,
  ) {
    return await this.userCardService.updateUserCard(+id, updateUserCardDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  async deleteComfort(@Param('id') id: number): Promise<number> {
    return await this.userCardService.deleteUserCard(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Create a Cart' })
  @ApiBearerAuth()
  @Post()
  createCart(@Body() createCartDto: CreateCartDto) {
    return this.cartService.createCart(createCartDto);
  }

  @ApiOperation({ summary: 'Get all Cart' })
  @Get()
  getAllCarts() {
    return this.cartService.getAllCarts();
  }

  @ApiOperation({ summary: 'Get Cart' })
  @Get(':id')
  getCartById(@Param('id') id: string) {
    return this.cartService.getCartById(+id);
  }

  @ApiOperation({ summary: 'Update Cart' })
  @Put(':id')
  async updateCart(
    @Param('id') id: number,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return await this.cartService.updateCart(+id, updateCartDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  async deleteCart(@Param('id') id: number): Promise<number> {
    return await this.cartService.deleteCart(id);
  }
}

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
import { OrderService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Create a Order' })
  @ApiBearerAuth()
  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @ApiOperation({ summary: 'Get all Order' })
  @Get()
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @ApiOperation({ summary: 'Get Order' })
  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(+id);
  }

  @ApiOperation({ summary: 'Update Order' })
  @Put(':id')
  async updateOrder(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.orderService.updateOrder(+id, updateOrderDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  async deleteOrder(@Param('id') id: number): Promise<number> {
    return await this.orderService.deleteOrder(id);
  }
}

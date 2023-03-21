import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { OrderController } from './orders.controller';
import { OrderService } from './orders.service';

@Module({
  imports: [SequelizeModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrdersModule {}

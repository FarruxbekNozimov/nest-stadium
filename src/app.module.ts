import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/models/user.model';
import { ConfigModule } from '@nestjs/config';
import { ComfortModule } from './comfort/comfort.module';
import { UserWalletModule } from './user_wallet/user_wallet.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { CategoriesModule } from './categories/categories.module';
import { UserCardsModule } from './user_cards/user_cards.module';
import { StadiumsModule } from './stadiums/stadiums.module';
import { ComfortStadiumModule } from './comfort_stadium/comfort_stadium.module';
import { MediaModule } from './media/media.module';
import { CommentsModule } from './comments/comments.module';
import { AdminModule } from './admin/admin.module';
import { StadiumTimesModule } from './stadium_times/stadium_times.module';
import { StatusModule } from './status/status.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [User],
      autoLoadModels: true,
      logging: false,
    }),
    UsersModule,
    ComfortModule,
    UserWalletModule,
    RegionModule,
    DistrictModule,
    CategoriesModule,
    UserCardsModule,
    StadiumsModule,
    ComfortStadiumModule,
    MediaModule,
    CommentsModule,
    AdminModule,
    StadiumTimesModule,
    StatusModule,
    CartModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

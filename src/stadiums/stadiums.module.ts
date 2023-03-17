import { Module } from '@nestjs/common';
import { StadiumController } from './stadiums.controller';
import { StadiumService } from './stadiums.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stadium } from './models/stadium.model';

@Module({
  imports: [SequelizeModule.forFeature([Stadium])],
  controllers: [StadiumController],
  providers: [StadiumService],
})
export class StadiumsModule {}

import { Module } from '@nestjs/common';
import { StadiumTimeController } from './stadium_times.controller';
import { StadiumTimeService } from './stadium_times.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { StadiumTime } from './models/stadium_time.model';

@Module({
  imports: [SequelizeModule.forFeature([StadiumTime])],
  controllers: [StadiumTimeController],
  providers: [StadiumTimeService],
})
export class StadiumTimeModule {}

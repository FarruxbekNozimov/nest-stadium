import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { AuthService } from '../auth/auth.service';
import { BotModule } from '../bot/bot.module';
import { OtpModule } from '../otp/otp.module';
import { MailModule } from '../mail/mail.module';
import { Otp } from '../otp/models/otp.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Otp]),
    BotModule,
    OtpModule,
    MailModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

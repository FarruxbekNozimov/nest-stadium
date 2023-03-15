import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Toshmat' })
  @IsNotEmpty()
  @IsString()
  readonly first_name: string;

  @ApiProperty({ example: 'Hoshimov' })
  @IsNotEmpty()
  @IsString()
  readonly last_name: string;

  @ApiProperty({ example: 'HoshimTosh' })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({ example: 'Uzb@k!$t0n' })
  @IsNotEmpty()
  @IsString()
  readonly hashed_password: string;

  @ApiProperty({ example: '@Toshbek' })
  @IsNotEmpty()
  @IsString()
  readonly telegram_link: string;

  @ApiProperty({ example: 'tosh@gmail.com' })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({ example: '+998887028030' })
  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @ApiProperty({ example: '2137919738941.jpg' })
  @IsNotEmpty()
  @IsString()
  readonly user_photo: string;

  @ApiProperty({ example: '2023-03-14' })
  @IsNotEmpty()
  readonly birthday: Date;
}

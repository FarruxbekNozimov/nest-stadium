export class UpdateUserDto {
  readonly first_name: string;
  readonly last_name: string;
  readonly username: string;
  readonly hashed_password: string;
  readonly telegram_link: string;
  readonly email: string;
  readonly phone: string;
  readonly user_photo: string;
  readonly birthday: Date;
}

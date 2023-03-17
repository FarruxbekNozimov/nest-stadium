import { ApiProperty } from '@nestjs/swagger';

export class UpdateStadiumDto {
  @ApiProperty({ example: '1' })
  category_id: number;

  @ApiProperty({ example: '1' })
  owner_id: number;

  @ApiProperty({ example: 'Telegram' })
  contactWith?: string;

  @ApiProperty({ example: 'Bunyodkor' })
  name?: string;

  @ApiProperty({ example: '20' })
  volume?: string;

  @ApiProperty({ example: 'Murzo Ulugbek' })
  address?: string;

  @ApiProperty({ example: '1' })
  region_id: number;

  @ApiProperty({ example: '1' })
  district_id: number;

  @ApiProperty({ example: '41.299496-69.240074' })
  location?: string;

  @ApiProperty({ example: '1975' })
  buildAt?: string;

  @ApiProperty({ example: '8:00' })
  startTime?: string;

  @ApiProperty({ example: '16:00' })
  endTime?: string;
}

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
import { StadiumTimeService } from './stadium_times.service';
import { CreateStadiumTimeDto } from './dto/create-stadium_time.dto';
import { UpdateStadiumTimeDto } from './dto/update-stadium_time.dto';

@ApiTags('Stadium Time')
@Controller('stadium-time')
export class StadiumTimeController {
  constructor(private readonly stadiumTimeService: StadiumTimeService) {}

  @ApiOperation({ summary: 'Create a StadiumTime' })
  @ApiBearerAuth()
  @Post()
  createStadiumTime(@Body() createStadiumTimeDto: CreateStadiumTimeDto) {
    return this.stadiumTimeService.createStadiumTime(createStadiumTimeDto);
  }

  @ApiOperation({ summary: 'Get all StadiumTime' })
  @Get()
  getAllStadiumTimes() {
    return this.stadiumTimeService.getAllStadiumTimes();
  }

  @ApiOperation({ summary: 'Get StadiumTime' })
  @Get(':id')
  getStadiumTimeById(@Param('id') id: string) {
    return this.stadiumTimeService.getStadiumTimeById(+id);
  }

  @ApiOperation({ summary: 'Update StadiumTime' })
  @Put(':id')
  async updateStadiumTime(
    @Param('id') id: number,
    @Body() updateStadiumTimeDto: UpdateStadiumTimeDto,
  ) {
    return await this.stadiumTimeService.updateStadiumTime(
      +id,
      updateStadiumTimeDto,
    );
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  async deleteStadiumTime(@Param('id') id: number): Promise<number> {
    return await this.stadiumTimeService.deleteStadiumTime(id);
  }
}

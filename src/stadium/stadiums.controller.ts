import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StadiumService } from './stadiums.service';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';

@ApiTags('Stadium')
@Controller('stadium')
export class StadiumController {
  constructor(private readonly stadiumService: StadiumService) {}

  @ApiOperation({ summary: 'Create a stadium' })
  @Post()
  createComfort(@Body() createStadiumDto: CreateStadiumDto) {
    return this.stadiumService.createStadium(createStadiumDto);
  }

  @ApiOperation({ summary: 'Get all stadium' })
  @Get()
  getAllComforts() {
    return this.stadiumService.getAllStadiums();
  }

  @ApiOperation({ summary: 'Get stadium' })
  @Get(':id')
  getComfortById(@Param('id') id: string) {
    return this.stadiumService.getStadiumById(+id);
  }

  @ApiOperation({ summary: 'Update stadium' })
  @Put(':id')
  async updateComfort(
    @Param('id') id: number,
    @Body() updateStadiumDto: UpdateStadiumDto,
  ) {
    return await this.stadiumService.updateStadium(+id, updateStadiumDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  async deleteComfort(@Param('id') id: number): Promise<number> {
    return await this.stadiumService.deleteStadium(id);
  }
}

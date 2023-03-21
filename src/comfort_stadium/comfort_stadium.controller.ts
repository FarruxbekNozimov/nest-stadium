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
import { ComfortStadiumService } from './comfort_stadium.service';
import { CreateComfortStadiumDto } from './dto/create-comfort_stadium.dto';
import { UpdateComfortStadiumDto } from './dto/update-comfort_stadium.dto';

@ApiTags('Comfort Stadium')
@Controller('comfort-stadium')
export class ComfortStadiumController {
  constructor(private readonly comfortStadiumService: ComfortStadiumService) {}

  @ApiOperation({ summary: 'Create a ComfortStadium' })
  @ApiBearerAuth()
  @Post()
  createComfortStadium(
    @Body() createComfortStadiumDto: CreateComfortStadiumDto,
  ) {
    return this.comfortStadiumService.createComfortStadium(
      createComfortStadiumDto,
    );
  }

  @ApiOperation({ summary: 'Get all ComfortStadium' })
  @Get()
  getAllComfortStadiums() {
    return this.comfortStadiumService.getAllComfortStadiums();
  }

  @ApiOperation({ summary: 'Get ComfortStadium' })
  @Get(':id')
  getComfortStadiumById(@Param('id') id: string) {
    return this.comfortStadiumService.getComfortStadiumById(+id);
  }

  @ApiOperation({ summary: 'Update ComfortStadium' })
  @Put(':id')
  async updateComfortStadium(
    @Param('id') id: number,
    @Body() updateComfortStadiumDto: UpdateComfortStadiumDto,
  ) {
    return await this.comfortStadiumService.updateComfortStadium(
      +id,
      updateComfortStadiumDto,
    );
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  async deleteComfortStadium(@Param('id') id: number): Promise<number> {
    return await this.comfortStadiumService.deleteComfortStadium(id);
  }
}

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
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @ApiOperation({ summary: 'Create a Media' })
  @ApiBearerAuth()
  @Post()
  createMedia(@Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.createMedia(createMediaDto);
  }

  @ApiOperation({ summary: 'Get all Media' })
  @Get()
  getAllMedias() {
    return this.mediaService.getAllMedias();
  }

  @ApiOperation({ summary: 'Get Media' })
  @Get(':id')
  getMediaById(@Param('id') id: string) {
    return this.mediaService.getMediaById(+id);
  }

  @ApiOperation({ summary: 'Update Media' })
  @Put(':id')
  async updateMedia(
    @Param('id') id: number,
    @Body() updateMediaDto: UpdateMediaDto,
  ) {
    return await this.mediaService.updateMedia(+id, updateMediaDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  async deleteMedia(@Param('id') id: number): Promise<number> {
    return await this.mediaService.deleteMedia(id);
  }
}

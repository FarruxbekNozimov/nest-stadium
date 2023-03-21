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
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@ApiTags('Status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiOperation({ summary: 'Create a Status' })
  @ApiBearerAuth()
  @Post()
  createStatus(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.createStatus(createStatusDto);
  }

  @ApiOperation({ summary: 'Get all Status' })
  @Get()
  getAllStatuss() {
    return this.statusService.getAllStatuss();
  }

  @ApiOperation({ summary: 'Get Status' })
  @Get(':id')
  getStatusById(@Param('id') id: string) {
    return this.statusService.getStatusById(+id);
  }

  @ApiOperation({ summary: 'Update Status' })
  @Put(':id')
  async updateStatus(
    @Param('id') id: number,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return await this.statusService.updateStatus(+id, updateStatusDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  async deleteStatus(@Param('id') id: number): Promise<number> {
    return await this.statusService.deleteStatus(id);
  }
}

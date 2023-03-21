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
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Create a Admin' })
  @ApiBearerAuth()
  @Post()
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @ApiOperation({ summary: 'Get all Admin' })
  @Get()
  getAllAdmins() {
    return this.adminService.getAllAdmins();
  }

  @ApiOperation({ summary: 'Get Admin' })
  @Get(':id')
  getAdminById(@Param('id') id: string) {
    return this.adminService.getAdminById(+id);
  }

  @ApiOperation({ summary: 'Update Admin' })
  @Put(':id')
  async updateAdmin(
    @Param('id') id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return await this.adminService.updateAdmin(+id, updateAdminDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  async deleteAdmin(@Param('id') id: number): Promise<number> {
    return await this.adminService.deleteAdmin(id);
  }
}

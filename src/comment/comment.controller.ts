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
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'Create a Comment' })
  @ApiBearerAuth()
  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  @ApiOperation({ summary: 'Get all Comment' })
  @Get()
  getAllComments() {
    return this.commentService.getAllComments();
  }

  @ApiOperation({ summary: 'Get Comment' })
  @Get(':id')
  getCommentById(@Param('id') id: string) {
    return this.commentService.getCommentById(+id);
  }

  @ApiOperation({ summary: 'Update Comment' })
  @Put(':id')
  async updateComment(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return await this.commentService.updateComment(+id, updateCommentDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  async deleteComment(@Param('id') id: number): Promise<number> {
    return await this.commentService.deleteComment(id);
  }
}

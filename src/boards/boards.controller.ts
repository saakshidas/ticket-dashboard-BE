import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { BoardsService } from '../boards/boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateBoardDto) {
    return this.boardsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateBoardDto>) {
    return this.boardsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(id);
  }
}

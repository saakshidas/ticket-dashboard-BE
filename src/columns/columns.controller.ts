import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { ColumnsService } from '../columns/columns.service';
import { CreateColumnDto } from './dto/create-column.dto';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Get()
  findAll() {
    return this.columnsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.columnsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateColumnDto) {
    return this.columnsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateColumnDto>) {
    return this.columnsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.columnsService.remove(id);
  }
}

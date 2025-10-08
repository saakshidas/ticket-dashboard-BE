import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { CardsService } from '../cards/cards.service';
import { CreateCardDto } from './dto/create-card.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateCardDto) {
    return this.cardsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateCardDto>) {
    return this.cardsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(id);
  }
}

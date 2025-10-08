import { Module } from '@nestjs/common';
import { CardsController } from '../cards/cards.controller';
import { CardsService } from '../cards/cards.service';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}

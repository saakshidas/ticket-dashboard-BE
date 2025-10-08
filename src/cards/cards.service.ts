import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { v4 as uuid } from 'uuid';

type Card = {
  id: string;
  columnId?: string;
  title: string;
  description?: string;
};

@Injectable()
export class CardsService {
  private items: Card[] = [];

  findAll() {
    return this.items;
  }

  findOne(id: string) {
    const c = this.items.find((i) => i.id === id);
    if (!c) throw new NotFoundException('Card not found');
    return c;
  }

  create(dto: CreateCardDto) {
    const card: Card = { id: uuid(), ...dto } as any;
    this.items.push(card);
    return card;
  }

  update(id: string, dto: Partial<CreateCardDto>) {
    const idx = this.items.findIndex((i) => i.id === id);
    if (idx === -1) throw new NotFoundException('Card not found');
    this.items[idx] = { ...this.items[idx], ...dto };
    return this.items[idx];
  }

  remove(id: string) {
    const idx = this.items.findIndex((i) => i.id === id);
    if (idx === -1) throw new NotFoundException('Card not found');
    const [removed] = this.items.splice(idx, 1);
    return removed;
  }
}

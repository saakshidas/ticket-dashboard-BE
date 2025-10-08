import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { v4 as uuid } from 'uuid';

type Column = {
  id: string;
  boardId?: string;
  title: string;
  position?: number;
};

@Injectable()
export class ColumnsService {
  private items: Column[] = [];

  findAll() {
    return this.items;
  }

  findOne(id: string) {
    const c = this.items.find((i) => i.id === id);
    if (!c) throw new NotFoundException('Column not found');
    return c;
  }

  create(dto: CreateColumnDto) {
    const column: Column = { id: uuid(), ...dto } as any;
    this.items.push(column);
    return column;
  }

  update(id: string, dto: Partial<CreateColumnDto>) {
    const idx = this.items.findIndex((i) => i.id === id);
    if (idx === -1) throw new NotFoundException('Column not found');
    this.items[idx] = { ...this.items[idx], ...dto };
    return this.items[idx];
  }

  remove(id: string) {
    const idx = this.items.findIndex((i) => i.id === id);
    if (idx === -1) throw new NotFoundException('Column not found');
    const [removed] = this.items.splice(idx, 1);
    return removed;
  }
}

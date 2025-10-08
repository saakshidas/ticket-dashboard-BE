import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { v4 as uuid } from 'uuid';

type Board = {
  id: string;
  projectId?: string;
  title: string;
};

@Injectable()
export class BoardsService {
  private items: Board[] = [];

  findAll() {
    return this.items;
  }

  findOne(id: string) {
    const b = this.items.find((i) => i.id === id);
    if (!b) throw new NotFoundException('Board not found');
    return b;
  }

  create(dto: CreateBoardDto) {
    const board: Board = { id: uuid(), ...dto } as any;
    this.items.push(board);
    return board;
  }

  update(id: string, dto: Partial<CreateBoardDto>) {
    const idx = this.items.findIndex((i) => i.id === id);
    if (idx === -1) throw new NotFoundException('Board not found');
    this.items[idx] = { ...this.items[idx], ...dto };
    return this.items[idx];
  }

  remove(id: string) {
    const idx = this.items.findIndex((i) => i.id === id);
    if (idx === -1) throw new NotFoundException('Board not found');
    const [removed] = this.items.splice(idx, 1);
    return removed;
  }
}

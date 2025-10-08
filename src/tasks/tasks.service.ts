import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { v4 as uuid } from 'uuid';

type Task = {
  id: string;
  cardId?: string;
  title: string;
  completed?: boolean;
};

@Injectable()
export class TasksService {
  private items: Task[] = [];

  findAll() {
    return this.items;
  }

  findOne(id: string) {
    const t = this.items.find((i) => i.id === id);
    if (!t) throw new NotFoundException('Task not found');
    return t;
  }

  create(dto: CreateTaskDto) {
    const task: Task = { id: uuid(), ...dto } as any;
    this.items.push(task);
    return task;
  }

  update(id: string, dto: Partial<CreateTaskDto>) {
    const idx = this.items.findIndex((i) => i.id === id);
    if (idx === -1) throw new NotFoundException('Task not found');
    this.items[idx] = { ...this.items[idx], ...dto };
    return this.items[idx];
  }

  remove(id: string) {
    const idx = this.items.findIndex((i) => i.id === id);
    if (idx === -1) throw new NotFoundException('Task not found');
    const [removed] = this.items.splice(idx, 1);
    return removed;
  }
}

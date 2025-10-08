import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { v4 as uuid } from 'uuid';

type Project = {
  id: string;
  name: string;
  description?: string;
};

@Injectable()
export class ProjectsService {
  private items: Project[] = [];

  findAll() {
    return this.items;
  }

  findOne(id: string) {
    const p = this.items.find((i) => i.id === id);
    if (!p) throw new NotFoundException('Project not found');
    return p;
  }

  create(dto: CreateProjectDto) {
    const project: Project = { id: uuid(), ...dto } as any;
    this.items.push(project);
    return project;
  }

  update(id: string, dto: Partial<CreateProjectDto>) {
    const idx = this.items.findIndex((i) => i.id === id);
    if (idx === -1) throw new NotFoundException('Project not found');
    this.items[idx] = { ...this.items[idx], ...dto };
    return this.items[idx];
  }

  remove(id: string) {
    const idx = this.items.findIndex((i) => i.id === id);
    if (idx === -1) throw new NotFoundException('Project not found');
    const [removed] = this.items.splice(idx, 1);
    return removed;
  }
}

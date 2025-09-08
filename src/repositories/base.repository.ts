import { injectable } from 'inversify';
import { IBaseRepository } from './interfaces/base.repository.interface';

@injectable()
export abstract class BaseRepository<T, CreateDto, UpdateDto> 
  implements IBaseRepository<T, CreateDto, UpdateDto> {
  
  protected abstract model: {
    create: (args: { data: CreateDto }) => Promise<T>;
    findUnique: (args: { where: { id: string } }) => Promise<T | null>;
    findMany: (args?: { orderBy?: { createdAt: 'desc' | 'asc' } }) => Promise<T[]>;
    update: (args: { where: { id: string }; data: UpdateDto }) => Promise<T>;
  };

  async create(data: CreateDto): Promise<T> {
    return await this.model.create({
      data,
    });
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<T[]> {
    return await this.model.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, data: UpdateDto): Promise<T> {
    return await this.model.update({
      where: { id },
      data,
    });
  }
}

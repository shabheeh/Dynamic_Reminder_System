import { injectable } from 'inversify';
import { IBaseRepository } from './interfaces/base.repository.interface';
import { PaginatedResult, PaginationOptions } from '@/types/pagination.types';

@injectable()
export abstract class BaseRepository<T, CreateDto, UpdateDto> 
  implements IBaseRepository<T, CreateDto, UpdateDto> {
  
  protected abstract model: {
    create: (args: { data: CreateDto }) => Promise<T>;
    findUnique: (args: { where: { id: string } }) => Promise<T | null>;
    findMany: (args?: { 
      orderBy?: { createdAt: 'desc' | 'asc' };
      skip?: number;
      take?: number;
    }) => Promise<T[]>;
    update: (args: { where: { id: string }; data: UpdateDto }) => Promise<T>;
    delete: (args: { where: { id: string } }) => Promise<T>;
    count: () => Promise<number>;
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

  async findAll(options: PaginationOptions = {}): Promise<PaginatedResult<T>> {
    const page = Math.max(options.page || 1, 1);
    const limit = Math.min(Math.max(options.limit || 10, 1), 100)
    const skip = (page - 1) * limit;

    const [data, totalItems] = await Promise.all([
      this.model.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.model.count()
    ]);

    const totalPages = Math.ceil(totalItems / limit);
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;

    return {
      data,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNext,
        hasPrevious,
      },
    };
  }

  async update(id: string, data: UpdateDto): Promise<T> {
    return await this.model.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<T> {
    return await this.model.delete({
      where: { id },
    });
  }
}

import { PaginatedResult, PaginationOptions } from "@/types/pagination.types";

export interface IBaseRepository<T, CreateDto, UpdateDto> {
  create(data: CreateDto): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(options: PaginationOptions): Promise<PaginatedResult<T>>;
  update(id: string, data: UpdateDto): Promise<T>;
  delete(id: string): Promise<T>;
}

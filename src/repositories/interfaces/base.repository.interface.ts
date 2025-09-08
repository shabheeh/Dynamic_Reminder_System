export interface IBaseRepository<T, CreateDto, UpdateDto> {
  create(data: CreateDto): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: string, data: UpdateDto): Promise<T>;
}

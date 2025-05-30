import { IBaseRepository } from "../repositories/BaseRepository.js";

export interface IBaseService<T> {
  getAll(): Promise<T[]>;
  getById(id: string | number): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: string | number, data: Partial<T>): Promise<T>;
  delete(id: string | number): Promise<T>;
}

export abstract class BaseService<T> implements IBaseService<T> {
  constructor(protected repository: IBaseRepository<T>) {}

  async getAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  async getById(id: string | number): Promise<T | null> {
    return this.repository.findById(id);
  }

  async create(data: Partial<T>): Promise<T> {
    return this.repository.create(data);
  }

  async update(id: string | number, data: Partial<T>): Promise<T> {
    return this.repository.update(id, data);
  }

  async delete(id: string | number): Promise<T> {
    return this.repository.delete(id);
  }
} 
import { Injectable } from '@nestjs/common';
import { ICache } from './cache.interface';

@Injectable()
export class InMemoryCacheService implements ICache {
  private cache: Map<string, any> = new Map();

  get<T>(key: string): T | undefined {
    return this.cache.get(key);
  }

  set<T>(key: string, value: T, ttl?: number): void {
    this.cache.set(key, value);
  }

  remove(key: string): void {
    this.cache.delete(key);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }
}
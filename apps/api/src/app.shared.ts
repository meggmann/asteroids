export interface IRepository<T> {
  getOne(id: string): Promise<T>;
  query(query: any): Promise<T[]>;
}
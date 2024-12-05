import { Injectable } from '@nestjs/common';
import { IAsteroid } from '@asteroids/shared/schemas';
import { AsteroidQueryParamsDto, AsteroidsResponse } from './asteroids.shared';
import { AsteroidsRepository } from './asteroids.repository';

@Injectable()
export class AsteroidsService {
  constructor(private readonly asteroidsRepository: AsteroidsRepository) {}

  async getAsteroids(query: AsteroidQueryParamsDto) {
    return this.asteroidsRepository.query(query);
  }

  getAsteroid(id: string) {
    return this.asteroidsRepository.getOne(id);
  }
}

import { Controller, Get, Param, Query } from "@nestjs/common";
import { AsteroidsService } from "./asteroids.service";
import { AsteroidQueryParamsDto, AsteroidsResponse } from "./asteroids.shared";
import { IAsteroid } from "@asteroids/shared/schemas";
import { InMemoryCacheService } from "src/cache/in-memory-cache.service";

@Controller("asteroids")
export class AsteroidsController {
  constructor(
    private readonly asteroidsService: AsteroidsService,
    private readonly cacheService: InMemoryCacheService
  ) {}

  @Get()
  async getAsteroids(
    @Query() query: AsteroidQueryParamsDto = {}
  ): Promise<AsteroidsResponse> {
    const cacheKey = JSON.stringify(query);

    const cachedData = this.cacheService.get<IAsteroid[]>(cacheKey);

    if (cachedData) {
      return {
        data: cachedData,
        total: cachedData.length,
        page: query.page,
        limit: query.limit,
      };
    }

    const response = await this.asteroidsService.getAsteroids(query);

    this.cacheService.set(cacheKey, response);

    return {
      data: response,
      total: response.length,
      page: query.page,
      limit: query.limit,
    };
  }

  @Get(":id")
  getAsteroid(@Param("id") id: string): Promise<IAsteroid> {
    const cacheKey = `asteroid-${id}`;

    const cachedData = this.cacheService.get<IAsteroid>(cacheKey);

    if (cachedData) {
      return Promise.resolve(cachedData);
    }

    const result = this.asteroidsService.getAsteroid(id);

    this.cacheService.set(cacheKey, result);

    return result;
  }
}

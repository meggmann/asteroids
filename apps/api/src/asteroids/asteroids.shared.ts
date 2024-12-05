import { IAsteroid } from "@asteroids/shared/schemas";
import {
  IsOptional,
  IsString,
  IsNumber,
  IsIn,
  IsDateString,
} from "class-validator";

export class AsteroidQueryParamsDto {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsIn(["asc", "desc"])
  sortOrder?: "asc" | "desc";

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;

  @IsOptional()
  @IsString()
  search?: string;
}

export interface AsteroidsResponse {
  data: IAsteroid[];
  total: number;
  page: number;
  limit: number;
}

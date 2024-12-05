import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { AsteroidQueryParamsDto } from "./asteroids.shared";
import { IAsteroid } from "@asteroids/shared/schemas";
import { IRepository } from "src/app.shared";
import { ConfigService } from "@nestjs/config";
const NASA_URL = "https://api.nasa.gov/neo/rest/v1";

@Injectable()
export class AsteroidsRepository implements IRepository<IAsteroid> {
  private apiKey: string;

  private axiosInstance: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('NASA_API_KEY') ?? 'DEMO_KEY';

    this.axiosInstance = axios.create({
      baseURL: NASA_URL,
    });
  }

  private formatDate = (dateTimestamp: string) => {
    const date = new Date(Number(dateTimestamp));

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  private sort(data: IAsteroid[], by: string, order: "asc" | "desc") {
    return data.sort((a, b) => {
      if (order === "asc") {
        return a[by] > b[by] ? 1 : -1;
      } else {
        return a[by] < b[by] ? 1 : -1;
      }
    });
  }

  async query(query: AsteroidQueryParamsDto) {
    const startDate = this.formatDate(query.startDate);
    const endDate = this.formatDate(query.endDate);

    const params: Record<string, string> = {
      api_key: this.apiKey,
      ...(query.startDate && { start_date: startDate }),
      ...(query.endDate && { end_date: endDate }),
    };

    const response = await this.axiosInstance.get("/feed", { params });

    const result = Object.values(response.data.near_earth_objects).flat();

    if (query.sortBy) {
      return this.sort(result, query.sortBy, query.sortOrder ?? 'asc');
    }

    return result;
  }

  async getOne(id: string) {
    const params: Record<string, string> = {
      api_key: this.apiKey,
    };

    const response = await this.axiosInstance.get(`/neo/${id}`, { params });

    return response.data;
  }
}

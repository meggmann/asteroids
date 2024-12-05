import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AsteroidsModule } from "./asteroids/asteroids.module";
import { CacheModule } from "./cache/cache.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    AsteroidsModule,
    CacheModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

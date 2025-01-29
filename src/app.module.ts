import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfig, dbConfig, jwtConfig } from '@config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
    load: [appConfig, dbConfig, jwtConfig]
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: ((config: ConfigService) => ({
      type: "postgres",
      port: config.get<number>('database.port'),
      host: config.get<string>('database.host'),
      username: config.get<string>('database.user'),
      password: config.get<string>('database.password'),
      database: config.get<string>('database.dbName'),
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
      // logging: true
    })),
    inject: [ConfigService]
  }),
  AuthModule

  ],
})
export class AppModule { }

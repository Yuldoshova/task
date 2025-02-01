import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import weatherApi from './config/weather-api.config';
import appConfig from './config/app.config';
import dbConfig from './config/db.config';
import jwtConfig from './config/jwt.config';
import { User } from './modules/user/entities/user.entity';
import { Country } from './modules/address/entities/country.entity';
import { City } from './modules/address/entities/city.entity';
import { Weather } from './modules/weather/entities/weather.entity';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AddressModule } from './modules/address/address.module';
import { WeatherModule } from './modules/weather/weather.module';
import { Color } from './modules/weather/entities/color.entity';
import { CloudCoverage } from './modules/weather/entities/cloud-coverage';
import { Temperature } from './modules/weather/entities/temperature.entity';
import { WindSpeed } from './modules/weather/entities/wind-speed.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
    load: [appConfig, dbConfig, jwtConfig, weatherApi]
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
      entities: [User, Country, City, Weather, Color, CloudCoverage, Temperature, WindSpeed],
      synchronize: true,
      autoLoadEntities: true,
      // logging: true
    })),
    inject: [ConfigService]
  }),
  ScheduleModule.forRoot(),
    AuthModule,
    UserModule,
    AddressModule,
    WeatherModule
  ],
})
export class AppModule { }

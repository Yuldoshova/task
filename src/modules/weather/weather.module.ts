import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weather } from './entities/weather.entity';
import { Color } from './entities/color.entity';
import { CloudCoverage } from './entities/cloud-coverage';
import { Temperature } from './entities/temperature.entity';
import { WindSpeed } from './entities/wind-speed.entity';
import { AddressService } from '../address/address.service';
import { City } from '../address/entities/city.entity';
import { Country } from '../address/entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Weather, Color, CloudCoverage, Temperature, WindSpeed, City, Country])],
  controllers: [WeatherController],
  providers: [WeatherService, ConfigService, AddressService],
})
export class WeatherModule { }

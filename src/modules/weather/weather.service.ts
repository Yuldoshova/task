import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Weather } from './entities/weather.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { City } from '../address/entities/city.entity';
import { AddressService } from '../address/address.service';
import { Color } from './entities/color.entity';
import { Temperature } from './entities/temperature.entity';
import { CloudCoverage } from './entities/cloud-coverage';
import { WindSpeed } from './entities/wind-speed.entity';

@Injectable()
export class WeatherService {
  private apiUrl: string;
  private apiKey: string;

  constructor(
    @InjectRepository(Weather)
    private weatherRepository: Repository<Weather>,
    @InjectRepository(Color)
    private colorRepository: Repository<Color>,
    @InjectRepository(Color)
    private temperatureRepository: Repository<Temperature>,
    @InjectRepository(Color)
    private windSpeedRepo: Repository<WindSpeed>,
    @InjectRepository(Color)
    private cloudCoverageRepo: Repository<CloudCoverage>,
    private addressService: AddressService,
    private configService: ConfigService
  ) {
    this.apiUrl = this.configService.get<string>('WEATHER_API_URL')
    this.apiKey = this.configService.get<string>('WEATHER_API_KEY')
  }

  async getWeatherForCity(city: City) {
    const url = `${this.apiUrl}?key=${this.apiKey}&q=${city.name}`;
    try {
      const response = await axios.get(url);
      const data = response.data;

      return {
        city: city,
        temperature: data.current.temp_c,
        windSpeed: data.current.wind_kph,
        cloudCoverage: data.current.cloud,
        recordedAt: new Date(),
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  }


  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async updateWeatherData() {
    const cities = await this.addressService.findAllCities();

    for (const city of cities) {
      const weatherData = await this.getWeatherForCity(city);
      await this.weatherRepository.save(weatherData);
    }

    console.log('Weather data updated successfully!');
  }

  async getWeather(city: string) {
    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          key: this.apiKey,
          q: city,
        },
      });

      const data = response.data;
      return {
        name: data.location.name,
        country: data.location.country,
        lat: data.location.lat,
        lon: data.location.lon,
        min_temp: data.current.temp_c,
        max_temp: data.current.temp_f,
        temp_color: this.getTemperatureColor(data.current.temp_c, data.current.temp_f),
        min_wind: data.current.wind_mph,
        max_wind: data.current.wind_kph,
        wind_color: this.getWindColor(data.current.wind_mph, data.current.wind_kph),
        cloud: data.current.cloud,
        cloud_color: this.getCloudColor(data.current.cloud),
      };
    } catch (error) {
      throw new HttpException('Ob-havo ma’lumoti olinmadi', HttpStatus.BAD_REQUEST);
    }
  }

  async getTemperatureColor(minTemp: number, maxTemp: number) {
    const findTemp = await this.temperatureRepository.findOneBy({ max_temp: maxTemp, min_temp: minTemp })
    if (!findTemp) {
      return "#FFFFFF"
    }
    const findColor = await this.colorRepository.findOneBy({ id: findTemp.color.id })
    return findColor.code
  }

  async getWindColor(minWind: number, maxWind: number) {
    const findWind = await this.windSpeedRepo.findOneBy({ max_speed: maxWind, min_speed: minWind })
    if (!findWind) {
      return "#FFFFFF"
    }
    const findColor = await this.colorRepository.findOneBy({ id: findWind.color.id })
    return findColor.code
  }

  async getCloudColor(cloud: number) {
    const findCloud = await this.cloudCoverageRepo.findOneBy({ max_coverage: cloud })
    if (!findCloud) {
      return "#FFFFFF"
    }
    const findColor = await this.colorRepository.findOneBy({ id: findCloud.color.id })
    return findColor.code
  }


  async findAllWeatherByCityId(id: number) {
    return this.weatherRepository.find({ relations: ['city'] });
  }


}

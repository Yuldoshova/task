import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { UserRoles } from '../../utils/user-role.enum';
import { Protected } from '../../modules/decorators/protected.decorator';
import { Roles } from '../../modules/decorators/role.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) { }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.ADMIN, UserRoles.USER])
  @Get("/all")
  getWeather(
    @Query('city') city: string
  ) {
    return this.weatherService.getWeather(city)
  }


  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.ADMIN, UserRoles.USER])
  @Get("/:cityId")
  findAllWeatherByCityId(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.weatherService.findAllWeatherByCityId(id);
  }
}

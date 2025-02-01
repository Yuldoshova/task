import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@ApiTags("Address")
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @Post("/countries/add")
  createCountry(
    @Body() createCountryDto: CreateCountryDto
  ) {
    return this.addressService.addCountry(createCountryDto);
  }

  @Get("/countries/all")
  findAllCountry() {
    return this.addressService.findAllCountries();
  }

  @Get('/countries/single/:id')
  findOneCountry(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.addressService.findOneCountry(id);
  }

  @Patch('/countries/update/:id')
  updateCountry(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCountryDto: UpdateCountryDto) {
    return this.addressService.updateCountry(id, updateCountryDto);
  }

  @Delete('/countries/remove/:id')
  removeCountry(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.addressService.removeCountry(id);
  }

  @Post("/cities/add")
  createCity(
    @Body() createCityDto: CreateCityDto
  ) {
    return this.addressService.addCity(createCityDto);
  }

  @Get("/cities/all")
  findAllCities() {
    return this.addressService.findAllCities();
  }

  @Get('/cities/single/:id')
  findOneCity(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.addressService.findOneCity(id);
  }

  @Patch('/cities/update/:id')
  updateCity(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCityDto: UpdateCityDto) {
    return this.addressService.updateCity(id, updateCityDto);
  }

  @Delete('/cities/remove/:id')
  removeCity(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.addressService.removeCity(id);
  }
}

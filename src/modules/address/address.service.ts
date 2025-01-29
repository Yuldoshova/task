import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCityDto, CreateCountryDto, UpdateCityDto, UpdateCountryDto } from './dto';
import { City, Country } from './entities';

@Injectable()
export class AddressService {

  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
    @InjectRepository(City)
    private cityRepository: Repository<City>
  ) { }

  async addCountry(create: CreateCountryDto) {
    const findCountry = await this.countryRepository.findOneBy({ name: create.name })
    if (findCountry) {
      throw new ConflictException("Country already exists!")
    }

    const newCountry = this.countryRepository.create({ name: create.name })
    await this.countryRepository.save(newCountry)

    return newCountry
  }

  async findAllCountries() {
    return await this.countryRepository.find({ relations: ["cities"] })
  }

  async findOneCountry(id: number) {
    const findCountry = await this.countryRepository.findOneBy({ id })
    if (!findCountry) {
      throw new NotFoundException("Country not found!")
    }
    return findCountry
  }

  async updateCountry(id: number, update: UpdateCountryDto) {
    const findCountry = await this.countryRepository.findOneBy({ id })
    if (!findCountry) {
      throw new NotFoundException("Country not found!")
    }

    await this.countryRepository.update({ id }, { name: update.name })
    return "Successfully updated✅"
  }

  async removeCountry(id: number) {
    const findCountry = await this.countryRepository.findOneBy({ id })
    if (!findCountry) {
      throw new NotFoundException("Country not found!")
    }

    await this.countryRepository.delete(id)
    return "Successfully deleted✅"
  }

  async addCity(create: CreateCityDto) {
    const findCity = await this.cityRepository.findOneBy({ name: create.name })
    if (findCity) {
      throw new ConflictException("City already exists!")
    }

    const findCountry = await this.findOneCountry(create.countryId)

    const newCity = this.cityRepository.create({
      name: create.name,
      country: findCountry,
      longitude: create.longitude,
      latitude: create.latitude
    })
    await this.cityRepository.save(newCity)

    return newCity
  }

  async findAllCities() {
    return await this.cityRepository.find({ relations: ["country"] })
  }

  async findOneCity(id: number) {
    const findCity = await this.cityRepository.findOneBy({ id })
    if (!findCity) {
      throw new NotFoundException("City not found!")
    }
    return findCity
  }

  async updateCity(id: number, update: UpdateCityDto) {
    const findCity = await this.cityRepository.findOneBy({ id })
    if (!findCity) {
      throw new NotFoundException("City not found!")
    }

    await this.cityRepository.update({ id }, { name: update.name })
    return "Successfully updated✅"
  }

  async removeCity(id: number) {
    const findCity = await this.cityRepository.findOneBy({ id })
    if (!findCity) {
      throw new NotFoundException("City not found!")
    }

    await this.countryRepository.delete(id)
    return "Successfully deleted✅"
  }
}

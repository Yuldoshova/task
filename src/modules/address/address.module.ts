import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Weather } from '../weather/entities/weather.entity';
import { Country } from './entities/country.entity';
import { City } from './entities/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country, City, Weather])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule { }

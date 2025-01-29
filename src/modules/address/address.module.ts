import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { City, Country } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Country, City])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule { }

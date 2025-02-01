import { ConfigService } from "@nestjs/config";
import { City } from "../modules/address/entities/city.entity";
import { Country } from "../modules/address/entities/country.entity";
import { User } from "../modules/user/entities/user.entity";
import { CloudCoverage } from "../modules/weather/entities/cloud-coverage";
import { Color } from "../modules/weather/entities/color.entity";
import { Temperature } from "../modules/weather/entities/temperature.entity";
import { Weather } from "../modules/weather/entities/weather.entity";
import { WindSpeed } from "../modules/weather/entities/wind-speed.entity";
import { DataSource } from "typeorm";

const config= new ConfigService()

export const AppDataSource = new DataSource({
    type: "postgres",
    port: 5432,
    host: "localhost",
    username: "postgres",
    password: "postgresql",
    database: "task",
    entities: [User, Country, City, Weather, Color, CloudCoverage, Temperature, WindSpeed],
    synchronize: false,
    logging: true,
});

export default AppDataSource
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Temperature } from "./temperature.entity";
import { WindSpeed } from "./wind-speed.entity";
import { CloudCoverage } from "./cloud-coverage";
import { City } from "../../address//entities/city.entity";
// import { City } from "modules/address/entities/city.entity";

@Entity("weathers")
export class Weather {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => City, city => city.weathers, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    city: City

    @ManyToOne(() => Temperature, temperature => temperature.weathers, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    temperatura: Temperature

    @ManyToOne(() => WindSpeed, windSpeed => windSpeed.weathers, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    windSpeed: WindSpeed

    @ManyToOne(() => CloudCoverage, cloudCoverage => cloudCoverage.weathers, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    cloudCovorage: CloudCoverage

    @Column({ name: "recorded_at", type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    recordedAt: Date;
}

export default Weather
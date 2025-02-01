import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Temperature } from "./temperature.entity";
import { WindSpeed } from "./wind-speed.entity";
import { CloudCoverage } from "./cloud-coverage";

@Entity("colors")
export class Color {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50, unique: true })
    name: string;

    @Column({ type: "varchar", length: 7, unique: true })
    code: string;

    @OneToMany(() => Temperature, (temperature) => temperature.color, { cascade: true })
    temperatures: Temperature[];

    @OneToMany(() => WindSpeed, (windSeed) => windSeed.color, { cascade: true })
    windSpeeds: WindSpeed[];

    @OneToMany(() => CloudCoverage, (cloudCoverage) => cloudCoverage.color, { cascade: true })
    cloudCoverages: CloudCoverage[];
}

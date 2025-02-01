import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "./country.entity";
import Weather from "../../weather/entities/weather.entity";

@Entity("cities")
export class City {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "name", type: "varchar", nullable: false, length: 100 })
    name: string

    @ManyToOne(() => Country, (country) => country.cities, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    country: Country

    @Column({ name: "latitude", type: "decimal", nullable: true })
    latitude: number

    @Column({ name: "longitude", type: "decimal", nullable: true })
    longitude: number

    @OneToMany(() => Weather, weather => weather.city, { cascade: true })
    weathers: Weather[]
}
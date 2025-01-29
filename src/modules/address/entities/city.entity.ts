import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "./country.entity";

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
}
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { City } from "./city.entity";

@Entity("countries")
export class Country {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "name", type: "varchar", nullable: false, unique: true, length: 100 })
    name: string

    @OneToMany(() => City, city => city.country, { cascade: true })
    cities: City[]
}
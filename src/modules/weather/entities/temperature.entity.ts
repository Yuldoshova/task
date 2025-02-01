import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Color } from "./color.entity";
import { Weather } from "./weather.entity";

@Entity("temperatures")
export class Temperature {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "type", type: "varchar", nullable: false, length: 50 })
    type: string;

    @Column({ name: "min_temp", type: 'decimal' })
    min_temp: number;

    @Column({ name: "max_temp", type: 'decimal' })
    max_temp: number;

    @ManyToOne(() => Color, (color) => color.temperatures, { eager: true, onDelete: "CASCADE", onUpdate: "CASCADE"  })
    color: Color;

    @OneToMany(() => Weather, weather => weather.temperatura, { cascade: true , nullable:true})
    weathers: Weather[]
}
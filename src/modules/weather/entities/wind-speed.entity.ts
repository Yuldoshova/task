import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Color } from './color.entity';
import { Weather } from './weather.entity';

@Entity("wind_speeds")
export class WindSpeed {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "min_speed", type: 'decimal' })
    min_speed: number;

    @Column({ name: "max_speed", type: 'decimal' })
    max_speed: number;

    @ManyToOne(() => Color, (color) => color.windSpeeds, { eager: true, onDelete: "CASCADE", onUpdate: "CASCADE"  })
    color: Color;

    @OneToMany(() => Weather, weather => weather.city, { cascade: true })
    weathers: Weather[]
}

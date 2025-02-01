import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Color } from './color.entity';
import { Weather } from './weather.entity';

@Entity("cloud_coverage")
export class CloudCoverage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "min_coverage", type: 'int' })
    min_coverage: number;

    @Column({ name: "max_coverage", type: 'int' })
    max_coverage: number;

    @ManyToOne(() => Color, (color) => color.cloudCoverages, { eager: true, onDelete: "CASCADE", onUpdate: "CASCADE"  })
    color: Color;

    @OneToMany(() => Weather, weather => weather.city, { cascade: true })
    weathers: Weather[]
}

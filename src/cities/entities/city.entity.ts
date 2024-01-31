import { text } from "stream/consumers";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'cities'})
export class City {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true})
    name: string;

    @Column({ type: 'text', nullable: true})
    description: string;

    @Column({ type: 'boolean', default: true})
    active: boolean;
}

   
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users'})
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false})
    email: string

    @Column({nullable: false})
    password: string

    toResponse(){
        const { id, email} = this
        return { id, email}
    }
}

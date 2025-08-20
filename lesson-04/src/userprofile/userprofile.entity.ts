import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Userprofile { 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userid: number;

    @Column()
    address: string;

    @Column()
    image: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type UserRole = 'MANAGER' | 'DEVELOPER' | 'TESTER';

@Entity()
export class Users{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    role: UserRole;
}

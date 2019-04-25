import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import uuidv4 from 'uuid/v4';

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar", { length: 200 })
    email: string;

    @Column({ type: "text" })
    password: string;

    @Column({ type: "text" })
    firstName: string;

    @Column({ type: "text" })
    lastName: string;

    @BeforeInsert()
    genId() {
        this.id = uuidv4();
    }
}

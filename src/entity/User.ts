import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BaseEntity } from "typeorm";
import uuidv4 from 'uuid/v4';

@Entity("users")
export class User extends BaseEntity {

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

    @Column("boolean", { default: false })
    comfirmEmail: boolean;

    @BeforeInsert()
    genId() {
        this.id = uuidv4();
    }
}

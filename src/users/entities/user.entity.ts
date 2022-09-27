import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User extends BaseEntity {

    @PrimaryColumn({
        unique: true,
        nullable: false
    })
    id: string;

    @Column({
        nullable: false,
        unique: true
    })
    nonce: string;
}
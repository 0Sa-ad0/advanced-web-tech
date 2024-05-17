// TRUSTEES.ENTITY.TS

import { AdminEntity } from 'src/admin/admin.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity("trustees")
export class trusteesEntity {
        @PrimaryGeneratedColumn()
        id: number;

        @Column({ name: 'fullname', type: "varchar", length: 150 })
        name: string;

        @Column({ type: "varchar", length: 150 })
        email: string;

        @OneToOne(() => AdminEntity, admin => admin.trustees)
        admin: AdminEntity;
}
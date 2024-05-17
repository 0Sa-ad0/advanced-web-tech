// OFFICE.ENTITY.TS

import { AdminEntity } from 'src/admin/admin.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity("Office")
export class OfficeEntity {
        @PrimaryGeneratedColumn()
        id: number;

        @Column({ name: 'officeName', type: "varchar", length: 150 })
        officeName: string;

        @Column({ name: 'name', type: "varchar", length: 150 })
        name: string;

        @Column({ type: "varchar", length: 150 })
        email: string;

        @Column({ type: "varchar", length: 20 }) 
        phone: string;

        @Column({ type: "varchar", length: 100 }) 
        role: string;

        @Column({ default: false }) // Assuming suspended should default to false
        suspended: boolean;

        @ManyToOne(() => AdminEntity, admin => admin.offices)
        admin: AdminEntity;
}
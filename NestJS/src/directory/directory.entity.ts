/* eslint-disable prettier/prettier */
// DIRECTORY.ENTITY.TS

import { AdminEntity } from 'src/admin/admin.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity("directories")
export class directoriesEntity {
        @PrimaryGeneratedColumn()
        id: number;

        @Column({ name: 'fullname', type: "varchar", length: 150 })
        name: string;

        @Column({ type: "varchar", length: 150 })
        email: string;

        @Column({ type: "varchar", length: 150 })
        role: string;
        
        @ManyToOne(() => AdminEntity, admin => admin.directories)
        admin: AdminEntity;
}
//ADMIN.ENTITY.TS

import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { trusteesEntity } from 'src/trustees/trustees.entity';
import { directoriesEntity } from 'src/directory/directory.entity';
import { OfficeEntity } from 'src/office/office.entity';


@Entity("Admin")
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'fullname', type: "varchar", length: 150 })
  name: string;
  @Column({ type: "varchar", length: 150 })
  email: string;
  @Column()
  phone: number;
  @Column()
  password: string;

  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // lastLogin: Date;

  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // registrationDate: Date;

  @OneToOne(() => trusteesEntity, trustees => trustees.admin, { cascade: true })
  @JoinColumn()
  trustees: trusteesEntity;

  @OneToMany(() => directoriesEntity, directory => directory.admin, { cascade: true })
  directories: directoriesEntity[];

  @OneToMany(() => OfficeEntity, office => office.admin, { cascade: true })
  offices: OfficeEntity[];
}
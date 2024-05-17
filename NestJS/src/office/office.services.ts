// OFFICE.SERVICES.TS

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfficeEntity } from 'src/office/office.entity';

@Injectable()
export class OfficeService {
        constructor(
                @InjectRepository(OfficeEntity)
                private readonly officeRepository: Repository<OfficeEntity>,
                
        ) { }

        async createOffice(officeName: string, name: string, email: string, phone: string, role: string): Promise<OfficeEntity> {
                const office = this.officeRepository.create({ officeName, name, email, phone, role });
                return await this.officeRepository.save(office);
        }

        async suspendOfficeMember(officeName: string, suspendedName: string): Promise<void> {
                await this.officeRepository.update({ officeName, name: suspendedName }, { suspended: true });
        }

        async addOrReplaceOfficeMember(officeName: string, name: string, email: string, phone: string, role: string): Promise<OfficeEntity> {
                const existingMember = await this.officeRepository.findOne({ where: { officeName: officeName, role: role } });

                if (existingMember) {
                        existingMember.name = name;
                        existingMember.email = email;
                        existingMember.phone = phone;
                        existingMember.suspended = false; 
                        return await this.officeRepository.save(existingMember);
                } else {
                        const office = this.officeRepository.create({ officeName, name, email, phone, role, suspended: false });
                        return await this.officeRepository.save(office);
                }
        }
}
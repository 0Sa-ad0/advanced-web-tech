// TRUSTEES.SERVICES.TS

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { trusteesEntity } from './trustees.entity';

@Injectable()
export class TrusteeService {
        constructor(
                @InjectRepository(trusteesEntity)
                private readonly trusteeRepository: Repository<trusteesEntity>,
        ) { }

        async createTrustee(name: string, email: string): Promise<trusteesEntity> {
                const trustee = this.trusteeRepository.create({ name, email });
                return await this.trusteeRepository.save(trustee);
        }

        // async removeTrustee(id: number): Promise<trusteesEntity | null> {
        //         const trusteeToRemove = await this.trusteeRepository.findOne({ where: { id: id } });
        //         if (!trusteeToRemove) {
        //                 return null; // Trustee not found
        //         }
        //         await this.trusteeRepository.remove(trusteeToRemove);
        //         return trusteeToRemove;
        // }

        async removeTrustee(name: string): Promise<trusteesEntity | null> {
  const trusteeToRemove = await this.trusteeRepository.findOne({ where: { name: name } });
  if (!trusteeToRemove) {
    return null; // Trustee not found
  }
  await this.trusteeRepository.remove(trusteeToRemove);
  return trusteeToRemove;
}

        async getAllTrustees(): Promise<trusteesEntity[]> {
                return await this.trusteeRepository.find();
        }
}

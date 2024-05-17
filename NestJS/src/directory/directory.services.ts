/* eslint-disable prettier/prettier */
// DIRECTORY.SERVICES.TS

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { directoriesEntity } from './directory.entity';

@Injectable()
export class DirectoryService {
        constructor(
                @InjectRepository(directoriesEntity)
                private readonly directoryRepository: Repository<directoriesEntity>,
        ) { }

        async createDirectory(name: string, email: string, role: string): Promise<directoriesEntity> {
                const directory = this.directoryRepository.create({ name, email, role });
                return await this.directoryRepository.save(directory);
        }

        async removeDirectory(name: string): Promise<directoriesEntity | null> {
                const directoryToRemove = await this.directoryRepository.findOne({ where: { name: name} });
                if (!directoryToRemove) {
                        return null; // not found
                }
                await this.directoryRepository.remove(directoryToRemove);
                return directoryToRemove;
        }

        async getAllDirectory(): Promise<directoriesEntity[]> {
                return await this.directoryRepository.find();
        }
}

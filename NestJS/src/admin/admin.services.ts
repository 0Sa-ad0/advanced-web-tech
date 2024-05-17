// ADMIN.SERVICES.TS

import { Injectable } from "@nestjs/common";
import { AdminDTO, LoginDTO } from "./admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "./admin.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { MailerService } from "@nestjs-modules/mailer";
import * as xlsx from 'xlsx';
import * as fs from 'fs';
// import { AnalyticsService } from "./analytics.service";

@Injectable()
export class AdminService {

        constructor(
                @InjectRepository(AdminEntity)
                private adminRepo: Repository<AdminEntity>,
                private mailerService: MailerService,
                // private analyticsService: AnalyticsService,
        ) { }

        async getIndex(): Promise<string> {
                const users = await this.adminRepo.find();
                if (users.length === 0) {
                        return 'Welcome to UMS';
                }
                const user = users[0];

                return `${user.name}`;
        }

        // async getIndex(): Promise<any> {
        //         const users = await this.adminRepo.find();
        //         const analyticsData = await this.analyticsService.getAnalyticsData();

        //         if (users.length === 0) {
        //                 return {
        //                         message: 'Welcome to UMS',
        //                         ...analyticsData,
        //                 };
        //         }

        //         const user = users[0];
        //         return {
        //                 message: `Welcome to UMS, ${user.name}`,
        //                 ...analyticsData,
        //         };
        // }

        // return `Welcome to UMS\nUSER: "${user.name}"\nEMAIL: "${user.email}"`;

        // async getAdminById(id: number): Promise<AdminEntity> {
        //         return this.adminRepo.findOneBy({ id });
        // }

        // async getAdminbyIDAndName(id, name): Promise<AdminEntity> {
        //         return this.adminRepo.findOneBy({ id: id, name: name });
        // }

        // async deleteUser(id: number): Promise<string> {
        //         const deleteResult = await this.adminRepo.delete(id);
        //         if (deleteResult.affected === 0) {
        //                 throw new Error(`User with ID ${id} not found.`);
        //         }
        //         return `User with ID ${id} has been deleted.`;
        // }

        async getAllUsers(): Promise<AdminEntity[]> {
                return this.adminRepo.find();
        }

        async signup(data: AdminDTO): Promise<AdminEntity> {
                const salt = await bcrypt.genSalt();
                data.password = await bcrypt.hash(data.password, salt);
                return await this.adminRepo.save(data);
        }

        async login(data: LoginDTO) {
                if (await this.adminRepo.count({ where: { email: data.email } }) == 0) {
                        return false;
                }
                const tableData1 = await this.adminRepo.findOneBy({ email: data.email })
                return bcrypt.compare(data.password, tableData1.password)
        }

        async sendmail(data: { email: string, message: string }): Promise<any> {
                const { email, message } = data;
                // if (!Array.isArray(email) || email.length === 0) {
                //         throw new Error('Invalid or empty email list');
                // }
                await this.mailerService.sendMail({
                        to: email,
                        subject: 'MESSAGE FROM ADMIN',
                        text: message,
                });
                // for (const email) {
                //         await this.mailerService.sendMail({
                //                 to: email,
                //                 subject: 'MESSAGE FROM ADMIN',
                //                 text: message,
                //         });
                // }

                const response = {
                        message: 'SEND EMAILS SUCCESSFULLY',
                        from: 'web.applications.site0@gmail.com',
                        to: email,
                        subject: 'MESSAGE FROM ADMIN',
                        messageContent: message
                };
                return response;
        }

        async parseExcelToCsv(excelFileBuffer: Buffer, csvFilePath: string): Promise<void> {
                try {
                        const workbook = xlsx.read(excelFileBuffer, { type: 'buffer' });
                        const sheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[sheetName];
                        const csvData = xlsx.utils.sheet_to_csv(worksheet);
                        fs.writeFileSync(csvFilePath, csvData);
                } catch (error) {
                        throw new Error(`Error parsing Excel file: ${error.message}`);
                }
        }
}
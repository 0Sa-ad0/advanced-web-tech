// ADMIN.CONTROLLER.TS

import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, Session, UseGuards, Delete, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { AdminService } from "./admin.services";
import { AdminDTO, LoginDTO, mailDTO } from "./admin.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { SessionGuard } from "./session.guard";
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { JwtService } from '@nestjs/jwt';
import { TrusteeService } from 'src/trustees/trustees.services';
import { DirectoryService } from "src/directory/directory.services";
import { OfficeService } from "src/office/office.services";
import { CustomException } from './admin.exception';
import { trusteesEntity } from "src/trustees/trustees.entity";
import { directoriesEntity } from "src/directory/directory.entity";
// import { AnalyticsService } from "./analytics.service";


@Controller('admin')

export class AdminController {
        constructor(private readonly jwtService: JwtService, private readonly adminService: AdminService, private readonly trusteeService: TrusteeService, private readonly directoryService: DirectoryService, private readonly officeService: OfficeService/*, private readonly analyticsService: AnalyticsService*/) { }



        @Post('addOffice')
        // @UseGuards(SessionGuard)
        async addOffice(
                @Body('officeName') officeName: string,
                @Body('Name') Name: string,
                @Body('Email') Email: string,
                @Body('Phone') Phone: string,
                @Body('Role') Role: string,
        ) {
                try {
                        const office = await this.officeService.createOffice(
                                officeName,
                                Name,
                                Email,
                                Phone,
                                Role,
                        );
                        const successMessage = `Mr/Mrs. "${Name}" is appointed as "${Role}" successfully at "${officeName}"`;
                        const response = {
                                success: true,
                                message: successMessage,
                                office: office,
                        };
                        return response;
                } catch (error) {
                        throw new CustomException(false, 'Failed to add office. Please try again later.', error.message);
                }
        }

        /* 
        Office of Controller of Examinations
        Office of Cultural Affairs
        Office of Finance and Audit
        Office of Human Resources
        Office of Placement & Alumni
        Office of Planning & Development
        Office of Probation
        Office of Public Relations
        Office of Registrar
        Office of Sports
        Office of Student Affairs 
        */

        @Post('suspendAndReplaceOfficeMember')
        // @UseGuards(SessionGuard)
        async suspendAndReplaceOfficeMember(
                @Body('officeName') officeName: string,
                @Body('suspendedName') suspendedName: string,
                @Body('newMemberName') newMemberName: string,
                @Body('email') email: string,
                @Body('phone') phone: string,
                @Body('role') role: string,
        ) {
                try {
                        await this.officeService.suspendOfficeMember(officeName, suspendedName);
                        const office = await this.officeService.addOrReplaceOfficeMember(
                                officeName,
                                newMemberName,
                                email,
                                phone,
                                role,
                        );
                        const successMessage = `Mr/Mrs. "${newMemberName}" is appointed as "${role}" successfully at "${officeName}"`;
                        const response = {
                                success: true,
                                message: successMessage,
                                office: office,
                        };
                        return response;
                } catch (error) {
                        throw new CustomException(false, 'Failed to suspend and replace office member.', error.message);
                }
        }

        @Post('addDirectory')
        // @UseGuards(SessionGuard)
        async addDirectory(
                @Body('directoryName') directoryName: string,
                @Body('directoryEmail') directoryEmail: string,
                @Body('directoryRole') directoryRole: string,
        ) {
                try {
                        const directory = await this.directoryService.createDirectory(
                                directoryName,
                                directoryEmail,
                                directoryRole,
                        );
                        const successMessage = `"${directoryRole}" "${directoryName}" added successfully`;
                        const response = {
                                success: true,
                                message: successMessage,
                                directory: directory,
                        };
                        return response;
                } catch (error) {
                        throw new CustomException(false, 'Failed to add directory.', error.message);
                }
        }

        @Delete('removeDirectory/:name')
        // @UseGuards(SessionGuard)
        async removeDirectory(@Param('name') name: string) {
                try {
                        const removeDirectory = await this.directoryService.removeDirectory(name);
                        if (removeDirectory) {
                                const successMessage = `"${removeDirectory.role}" "${removeDirectory.name}" removed successfully`;
                                return { success: true, message: successMessage, removeDirectory };
                        } else {
                                return { success: false, message: 'not found' };
                        }
                } catch (error) {
                        throw new CustomException(false, 'Failed to remove directory.', error.message);
                }
        }

        @Get('getDirectory')
        async getAllDirectory(): Promise<directoriesEntity[]> {
                return await this.directoryService.getAllDirectory();
        }

        @Post('addTrustee')
        // @UseGuards(SessionGuard)
        async addTrusteeByAdmin(
                @Body('trusteeName') trusteeName: string,
                @Body('trusteeEmail') trusteeEmail: string,
        ) {
                try {
                        const trustee = await this.trusteeService.createTrustee(
                                trusteeName,
                                trusteeEmail,
                        );
                        const successMessage = `successor "${trusteeName}" added by predecessor successfully`;
                        const response = {
                                success: true,
                                message: successMessage,
                                trustee: trustee,
                        };
                        return response;
                } catch (error) {
                        throw new CustomException(false, 'Failed to add trustee.', error.message);
                }
        }

        // @Delete('removeTrustee/:id')
        // // @UseGuards(SessionGuard)
        // async removeTrustee(@Param('id') id: number) {
        //         try {
        //                 const removedTrustee = await this.trusteeService.removeTrustee(id);
        //                 if (removedTrustee) {
        //                         const successMessage = `successor "${removedTrustee.name}" removed by predecessor successfully`;
        //                         return { success: true, message: successMessage, removedTrustee };
        //                 } else {
        //                         return { success: false, message: 'successor not found or could not be removed' };
        //                 }
        //         } catch (error) {
        //                 throw new CustomException(false, 'Failed to remove trustee.', error.message);
        //         }
        // }

        @Delete('removeTrustee/:name')
async removeTrusteeByName(@Param('name') name: string) {
  try {
    const removedTrustee = await this.trusteeService.removeTrustee(name);
    if (removedTrustee) {
      const successMessage = `Successor "${removedTrustee.name}" removed by predecessor successfully`;
      return { success: true, message: successMessage, removedTrustee };
    } else {
      return { success: false, message: 'Successor not found or could not be removed' };
    }
  } catch (error) {
    throw new CustomException(false, 'Failed to remove trustee.', error.message);
  }
}

        @Get('getTrustee')
        async getAllTrustees(): Promise<trusteesEntity[]> {
                return await this.trusteeService.getAllTrustees();
        }

        @Get('index')
        // @UseGuards(SessionGuard)
        getIndex(@Session() session): any {
                console.log(session.email);
                try {
                        return this.adminService.getIndex();
                } catch (error) {
                        throw new CustomException(false, 'Failed to get index. Please try again later.', error.message);
                }
        }

        // @Get('index')
        // async getIndex(@Session() session): Promise<any> {
        //         console.log(session.email);
        //         try {
        //                 const userData = await this.adminService.getIndex();
        //                 const analyticsData = await this.analyticsService.getAnalyticsData();
        //                 return { ...userData, analyticsData }; // Include analyticsData in the response
        //                 return this.adminService.getIndex();
        //         } catch (error) {
        //                 throw new CustomException(false, 'Failed to get index. Please try again later.', error.message);
        //         }
        // }

        @Post(('/upload'))
        // @UseGuards(SessionGuard)
        @UseInterceptors(FileInterceptor('myfile',
                {
                        fileFilter: (req, file, cb) => {
                                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg|txt|pdf|xlsx|docx)$/))
                                        cb(null, true);
                                else {
                                        throw new CustomException(false, 'FileUploadError', 'UNSUPPORTED_FORMAT');
                                }
                        },
                        limits: { fileSize: 1073741824 }, //1 GB
                        storage: diskStorage({
                                destination: './uploads',
                                filename: function (req, file, cb) {
                                        cb(null, Date.now() + file.originalname)
                                },
                        })
                }
        ))
        uploadFile(@UploadedFile() myfile: Express.Multer.File): object {
                console.log(myfile)
                return ({ message: "file uploaded" });
        }

        @Post('upload-excel')
        @UseInterceptors(FileInterceptor('excelFile'))
        async uploadExcel(@UploadedFile() excelFile: Express.Multer.File) {
                try {
                        if (!excelFile) {
                                throw new BadRequestException('No Excel file uploaded');
                        }
                        const outputDirectory = 'uploads';
                        const fileNameWithoutExtension = path.basename(excelFile.originalname, path.extname(excelFile.originalname));
                        const csvFilePath = path.join(outputDirectory, `${fileNameWithoutExtension}.csv`);
                        await this.adminService.parseExcelToCsv(excelFile.buffer, csvFilePath);
                        return {
                                message: 'Excel file parsed successfully!',
                                csvFilePath: csvFilePath,
                        };
                } catch (error) {
                        return {
                                error: `Error parsing Excel file: ${error.message}`,
                        };
                }
        }

        @Get('/getfile/:name')
        // @UseGuards(SessionGuard)
        async getFile(@Param('name') name: string, @Res() res) {
                const filePath = path.join(__dirname, `../../uploads/${name}`);
                try {
                        await fs.promises.access(filePath, fs.constants.F_OK);
                        res.sendFile(filePath);
                } catch (error) {
                        throw new CustomException(false, 'File not found', 'CHECK AGAIN');

                }
        }

        @Get('/listfiles')
        // @UseGuards(SessionGuard)
        listFiles(@Res() res) {
                const directoryPath = path.join(__dirname, '../../uploads');

                fs.readdir(directoryPath, (err, files) => {
                        if (err) {
                                throw new CustomException(false, 'Error reading directory', 'CHECK AGAIN');
                        }
                        return res.status(200).json({ files });
                });
        }

        @Post('/signup')
        // @UsePipes(new ValidationPipe)
        async signup(@Body() mydata: AdminDTO) {
                console.log(mydata);
                try {

                        const user = await this.adminService.signup(mydata);
                        // const token = this.jwtService.sign({ username: user.email });
                        // return { user, token };
                        return { user };
                } catch (error) {
                        throw new UnauthorizedException('Signup failed. Please try again.');
                }
                return (mydata);
        }

        @Post('/login')
        // @UsePipes(new ValidationPipe())
        async login(@Body() data: LoginDTO, @Session() session) {
                const isValidUser = await this.adminService.login(data);
                if (await this.adminService.login(data) || isValidUser) {
                        const token = this.jwtService.sign({ email: data.email });
                        session.email = data.email;
                        console.log(session.email);
                        return { message: 'success login', email: data.email, token };
                }
                else {
                        throw new UnauthorizedException('Invalid login');
                }
        }

        @Post('logout')
        async logout(@Session() session, @Res() res: Response) {
                session.destroy((err) => {
                        if (err) {
                                return res.status(500).send({ message: 'Failed to logout' });
                        }
                        res.clearCookie('connect.sid');
                        return res.status(200).send({ message: 'Logout successful' });
                });
        } catch() {
                throw new CustomException(false, 'logout failed', 'please try again');
        }

        @Post('/sendmail')
        // @UseGuards(SessionGuard)
        // @UsePipes(new ValidationPipe())
        sendmail(@Body() data: mailDTO) {
                try {
                        return this.adminService.sendmail(data);
                } catch (error) {
                        throw new CustomException(false, 'Failed to send mail', 'check again');
                }
        }
        /*
        "emails": ["recipient1@example.com", "recipient2@example.com"],
        "message": "This is the message content."
        */

}
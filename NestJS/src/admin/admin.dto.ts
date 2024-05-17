/* eslint-disable prettier/prettier */
//ADMIN.DTO.TS

import {
        IsEmail,
        IsPhoneNumber,
        IsString,
        Matches,
} from 'class-validator';

export class AdminDTO {
        // @IsString({ message: 'invalid name' })
        // @Matches(/^[a-zA-Z]+$/, { message: 'enter a proper name' })
        name: string;

        // @IsEmail({}, { message: 'invalid email' })
        email: string;

        // @IsString({ message: 'invalid password' })
        password: string;

        // @IsString({ message: 'invalid phone' })
        // phone: string;
        phone: number;
}

export class LoginDTO {
        // @IsEmail({}, { message: 'invalid email' })
        email: string;

        // @IsString({ message: 'invalid password' })
        password: string;
}

export class CreateOfficeDto {
        // @IsString({ message: 'invalid office name' })
        officeName: string;

        // @IsString({ message: 'invalid name' })
        name: string;

        // @IsEmail({}, { message: 'invalid email' })
        email: string;

        // @IsPhoneNumber(null, { message: 'invalid phone number' })
        phone: string;

        // @IsString({ message: 'invalid role' })
        role: string;
}

export class mailDTO {
        // @IsEmail({}, { message: "invalid email" })
        // [IF I UNCOMMENT IT, I CAN GIVE MAIL TO ONLY GMAIL... OTHERWISE EVERYONE, EVEN AIUB.EDU]
        email: string;

        // @IsString({ message: 'invalid message' })
        message: string;
}

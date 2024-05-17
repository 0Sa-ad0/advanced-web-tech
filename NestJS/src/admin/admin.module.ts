// ADMIN.MODULE.TS

import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.services";
import { AdminEntity} from "./admin.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MailerModule } from "@nestjs-modules/mailer";
import { JwtModule } from '@nestjs/jwt';
import { trusteesEntity } from "src/trustees/trustees.entity";
import { TrusteeService } from "src/trustees/trustees.services"; 
import { directoriesEntity } from "src/directory/directory.entity";
import { DirectoryService } from "src/directory/directory.services";
import { OfficeEntity } from "src/office/office.entity";
import { OfficeService } from "src/office/office.services";
// import { AnalyticsService } from "./analytics.service";


@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity, trusteesEntity, directoriesEntity, OfficeEntity]),
  MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'web.applications.site0@gmail.com',
        pass: 'ugtgwlknycfnsicj',
      },
    },
  }), 
  JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '24h' }, 
    })
  ],
  controllers: [AdminController],
  providers: [AdminService, TrusteeService, DirectoryService, OfficeService, /*AnalyticsService*/],
})
export class AdminModule { }
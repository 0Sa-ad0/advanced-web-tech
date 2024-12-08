// APP.MODULE.TS

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [AdminModule, TypeOrmModule.forRoot(
      {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '19114',
        database: 'ATP',
        autoLoadEntities: true,
        synchronize: true,
      }),
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
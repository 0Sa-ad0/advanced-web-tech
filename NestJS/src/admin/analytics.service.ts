// // analytics.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, MoreThan, Between } from 'typeorm';
// import { AdminEntity } from './admin.entity';

// @Injectable()
// export class AnalyticsService {
//   constructor(
//     @InjectRepository(AdminEntity)
//     private adminRepo: Repository<AdminEntity>,
//   ) { }

//   async countActiveUsers(): Promise<number> {
//     const cutoffDate = new Date();
//     cutoffDate.setDate(cutoffDate.getDate() - 30); // Example: Active within the last 30 days
//     const activeUsers = await this.adminRepo.count({ where: { lastLogin: MoreThan(cutoffDate) } });
//     return activeUsers;
//   }

//   async countNewUsersToday(): Promise<number> {
//     const today = new Date();
//     const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
//     const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
//     const newUsersToday = await this.adminRepo.count({ where: { registrationDate: Between(startOfDay, endOfDay) } });
//     return newUsersToday;
//   }

//   async getAnalyticsData(): Promise<any> {
//     const totalUsers = await this.adminRepo.count(); // Example: Get total users from the repository
//     const activeUsers = await this.countActiveUsers(); // Call the method to count active users
//     const newUsersToday = await this.countNewUsersToday(); // Call the method to count new users for today

//     return {
//       totalUsers,
//       activeUsers,
//       newUsersToday,
//     };
//   }
// }

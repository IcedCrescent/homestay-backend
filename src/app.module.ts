import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { RoomClassModule } from './room-class/room-class.module';
import { RoomModule } from './room/room.module';
import { BookingModule } from './booking/booking.module';
import { BookingController } from './booking/booking.controller';
import { BookingService } from './booking/booking.service';
import { VoucherModule } from './voucher/voucher.module';
import { TransactionModule } from './transaction/transaction.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AssetModule } from './asset/asset.module';
import { AttendanceModule } from './attendance/attendance.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { NewsModule } from './news/news.module';
import { BookingServiceModule } from './booking-service/booking-service.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    RoomClassModule,
    RoomModule,
    BookingModule,
    VoucherModule,
    TransactionModule,
    DashboardModule,
    AssetModule,
    AttendanceModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_KEY');

        if (!secret) {
          throw new Error('JWT_KEY environment variable is not set!');
        }

        return {
          secret,
          signOptions: { expiresIn: '7d' },
        };
      },
    }),
    NewsModule,
    BookingServiceModule,
  ],
  controllers: [
    AppController,
    UserController,
    AuthController,
    BookingController,
  ],
  providers: [
    AppService,
    UserService,
    AuthService,
    PrismaService,
    BookingService,
  ],
})
export class AppModule {}

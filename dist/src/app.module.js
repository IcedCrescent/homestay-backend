"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const user_service_1 = require("./user/user.service");
const user_controller_1 = require("./user/user.controller");
const auth_controller_1 = require("./auth/auth.controller");
const auth_service_1 = require("./auth/auth.service");
const prisma_service_1 = require("./prisma/prisma.service");
const auth_module_1 = require("./auth/auth.module");
const room_class_module_1 = require("./room-class/room-class.module");
const room_module_1 = require("./room/room.module");
const booking_module_1 = require("./booking/booking.module");
const booking_controller_1 = require("./booking/booking.controller");
const booking_service_1 = require("./booking/booking.service");
const voucher_module_1 = require("./voucher/voucher.module");
const transaction_module_1 = require("./transaction/transaction.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const asset_module_1 = require("./asset/asset.module");
const attendance_module_1 = require("./attendance/attendance.module");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const news_module_1 = require("./news/news.module");
const booking_service_module_1 = require("./booking-service/booking-service.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            room_class_module_1.RoomClassModule,
            room_module_1.RoomModule,
            booking_module_1.BookingModule,
            voucher_module_1.VoucherModule,
            transaction_module_1.TransactionModule,
            dashboard_module_1.DashboardModule,
            asset_module_1.AssetModule,
            attendance_module_1.AttendanceModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                global: true,
                useFactory: async (configService) => {
                    const secret = configService.get('JWT_KEY');
                    if (!secret) {
                        throw new Error('JWT_KEY environment variable is not set!');
                    }
                    return {
                        secret,
                        signOptions: { expiresIn: '7d' },
                    };
                },
            }),
            news_module_1.NewsModule,
            booking_service_module_1.BookingServiceModule,
        ],
        controllers: [
            app_controller_1.AppController,
            user_controller_1.UserController,
            auth_controller_1.AuthController,
            booking_controller_1.BookingController,
        ],
        providers: [
            app_service_1.AppService,
            user_service_1.UserService,
            auth_service_1.AuthService,
            prisma_service_1.PrismaService,
            booking_service_1.BookingService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
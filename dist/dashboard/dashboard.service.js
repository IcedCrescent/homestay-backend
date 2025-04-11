"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const date_fns_1 = require("date-fns");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    getDateRange(periodType, periodValue) {
        const endDate = new Date();
        let startDate = new Date();
        switch (periodType) {
            case 'day':
                startDate.setDate(endDate.getDate() - periodValue);
                break;
            case 'month':
                startDate.setMonth(endDate.getMonth() - periodValue);
                break;
            case 'year':
                startDate.setFullYear(endDate.getFullYear() - periodValue);
                break;
            default:
                throw new Error('Invalid periodType');
        }
        return { startDate, endDate };
    }
    async getBookingCountByRoomClass(periodType, periodValue) {
        const endDate = new Date();
        let startDate;
        switch (periodType) {
            case 'day':
                startDate = (0, date_fns_1.subDays)(endDate, periodValue);
                break;
            case 'month':
                startDate = (0, date_fns_1.subMonths)(endDate, periodValue);
                break;
            case 'year':
                startDate = (0, date_fns_1.subYears)(endDate, periodValue);
                break;
            default:
                throw new Error('Invalid period type');
        }
        const result = await this.prisma.booking.findMany({
            where: {
                from: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            select: {
                roomBookings: {
                    select: {
                        room: {
                            select: {
                                roomClass: {
                                    select: {
                                        name: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        const bookingCount = {};
        result.forEach((booking) => {
            booking.roomBookings.forEach((roomBooking) => {
                const roomClass = roomBooking.room.roomClass.name;
                bookingCount[roomClass] = (bookingCount[roomClass] || 0) + 1;
            });
        });
        return bookingCount;
    }
    async getTransactionSummary(periodType, periodValue) {
        const now = new Date();
        const results = [];
        for (let i = 0; i < periodValue; i++) {
            let startDate;
            let endDate;
            if (periodType === 'day') {
                startDate = new Date();
                startDate.setDate(now.getDate() - i);
                startDate.setHours(0, 0, 0, 0);
                endDate = new Date(startDate);
                endDate.setHours(23, 59, 59, 999);
            }
            else if (periodType === 'month') {
                startDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
                endDate = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59, 999);
            }
            else if (periodType === 'year') {
                startDate = new Date(now.getFullYear() - i, 0, 1);
                endDate = new Date(now.getFullYear() - i, 11, 31, 23, 59, 59, 999);
            }
            else {
                throw new Error('Invalid periodType');
            }
            const revenue = await this.prisma.transaction.aggregate({
                _sum: { amount: true },
                where: {
                    createdAt: { gte: startDate, lte: endDate },
                    type: 'REVENUE',
                },
            });
            const expense = await this.prisma.transaction.aggregate({
                _sum: { amount: true },
                where: {
                    createdAt: { gte: startDate, lte: endDate },
                    type: 'EXPENSE',
                },
            });
            results.push({
                revenue: revenue._sum.amount || 0,
                expense: expense._sum.amount || 0,
            });
        }
        return results;
    }
    async getBookingStatusCount(periodType, periodValue) {
        const { startDate, endDate } = this.getDateRange(periodType, periodValue);
        const statusCounts = await this.prisma.booking.groupBy({
            by: ['status'],
            where: {
                OR: [
                    {
                        status: { in: [-1, 0] },
                        from: { gte: startDate, lte: endDate },
                    },
                    {
                        status: { in: [1, 2] },
                        to: { gte: startDate, lte: endDate },
                    },
                ],
            },
            _count: {
                status: true,
            },
        });
        return {
            cancel: statusCounts.find((s) => s.status === -1)?._count.status || 0,
            pending: statusCounts.find((s) => s.status === 0)?._count.status || 0,
            confirmed: statusCounts.find((s) => s.status === 1)?._count.status || 0,
            complete: statusCounts.find((s) => s.status === 2)?._count.status || 0,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map
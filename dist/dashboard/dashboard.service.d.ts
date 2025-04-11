import { PrismaService } from '../prisma/prisma.service';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    private getDateRange;
    getBookingCountByRoomClass(periodType: 'day' | 'month' | 'year', periodValue: number): Promise<Record<string, number>>;
    getTransactionSummary(periodType: 'day' | 'month' | 'year', periodValue: number): Promise<{
        revenue: number;
        expense: number;
    }[]>;
    getBookingStatusCount(periodType: string, periodValue: number): Promise<{
        cancel: number;
        pending: number;
        confirmed: number;
        complete: number;
    }>;
}

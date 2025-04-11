import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getBookingCount(periodType: 'day' | 'month' | 'year', periodValue: string): Promise<Record<string, number>>;
    getTransactionSummary(type: 'day' | 'month' | 'year', period: string): Promise<{
        revenue: number;
        expense: number;
    }[]>;
    getBookingStatusCount(periodType: string, periodValue: string): Promise<{
        cancel: number;
        pending: number;
        confirmed: number;
        complete: number;
    }>;
}

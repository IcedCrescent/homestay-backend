import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('booking-count')
  async getBookingCount(
    @Query('type') periodType: 'day' | 'month' | 'year',
    @Query('period') periodValue: string,
  ) {
    return this.dashboardService.getBookingCountByRoomClass(
      periodType,
      parseInt(periodValue, 10),
    );
  }

  // Get total revenue/expense in a period
  @Get('transaction-summary')
  async getTransactionSummary(
    @Query('type') type: 'day' | 'month' | 'year',
    @Query('period') period: string,
  ) {
    return this.dashboardService.getTransactionSummary(type, +period);
  }

  @Get('booking-status-count')
  async getBookingStatusCount(
    @Query('type') periodType: string,
    @Query('period') periodValue: string,
  ) {
    return this.dashboardService.getBookingStatusCount(
      periodType,
      Number(periodValue),
    );
  }
}

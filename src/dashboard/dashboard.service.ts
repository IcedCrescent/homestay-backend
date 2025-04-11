import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { subDays, subMonths, subYears } from 'date-fns';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  private getDateRange(periodType: string, periodValue: number) {
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

  async getBookingCountByRoomClass(
    periodType: 'day' | 'month' | 'year',
    periodValue: number,
  ) {
    const endDate = new Date();
    let startDate: Date;

    switch (periodType) {
      case 'day':
        startDate = subDays(endDate, periodValue);
        break;
      case 'month':
        startDate = subMonths(endDate, periodValue);
        break;
      case 'year':
        startDate = subYears(endDate, periodValue);
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

    const bookingCount: Record<string, number> = {};

    result.forEach((booking) => {
      booking.roomBookings.forEach((roomBooking) => {
        const roomClass = roomBooking.room.roomClass.name;
        bookingCount[roomClass] = (bookingCount[roomClass] || 0) + 1;
      });
    });

    return bookingCount;
  }

  async getTransactionSummary(
    periodType: 'day' | 'month' | 'year',
    periodValue: number,
  ) {
    const now = new Date();
    const results: { revenue: number; expense: number }[] = [];

    for (let i = 0; i < periodValue; i++) {
      let startDate: Date;
      let endDate: Date;

      if (periodType === 'day') {
        startDate = new Date();
        startDate.setDate(now.getDate() - i);
        startDate.setHours(0, 0, 0, 0);

        endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999);
      } else if (periodType === 'month') {
        startDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
        endDate = new Date(
          now.getFullYear(),
          now.getMonth() - i + 1,
          0,
          23,
          59,
          59,
          999,
        );
      } else if (periodType === 'year') {
        startDate = new Date(now.getFullYear() - i, 0, 1);
        endDate = new Date(now.getFullYear() - i, 11, 31, 23, 59, 59, 999);
      } else {
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

  async getBookingStatusCount(periodType: string, periodValue: number) {
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
}

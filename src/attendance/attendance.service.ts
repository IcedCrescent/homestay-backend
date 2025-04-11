import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Shift } from '@prisma/client';
const dayjs = require('dayjs');

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  private readonly shiftTimes = {
    [Shift.MORNING]: ['07:30', '08:30'],
    [Shift.AFTERNOON]: ['13:30', '14:30'],
    [Shift.EVENING]: ['19:00', '20:00'],
    [Shift.NIGHT]: ['02:00', '07:30'],
  };

  private isValidCheckIn(shift: Shift): boolean {
    const now = new Date();
    const [start, end] = this.shiftTimes[shift];

    const startTime = new Date();
    const endTime = new Date();

    startTime.setHours(+start.split(':')[0], +start.split(':')[1], 0);
    endTime.setHours(+end.split(':')[0], +end.split(':')[1], 0);

    return now >= startTime && now <= endTime;
  }

  async checkIn(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { shift: true },
    });

    if (!user?.shift) throw new BadRequestException('User không có shift');

    if (!this.isValidCheckIn(user.shift)) {
      throw new BadRequestException('Không trong thời gian điểm danh hợp lệ!');
    }

    return this.prisma.attendance.create({
      data: { userId, shift: user.shift, checkInAt: new Date() },
    });
  }

  async getAllAttendance() {
    return this.prisma.attendance.findMany({
      include: { user: { select: { name: true, role: true } } },
    });
  }

  async confirmAttendance(attendanceId: number) {
    const attendanceRecord = await this.prisma.attendance.findUnique({
      where: { id: attendanceId },
    });

    if (!attendanceRecord) {
      throw new Error('Attendance record not found.');
    }

    const currentMonthStart = dayjs().startOf('month').toDate();
    const currentMonthEnd = dayjs().endOf('month').toDate();

    const checkInDate = new Date(attendanceRecord.checkInAt);

    if (checkInDate < currentMonthStart || checkInDate > currentMonthEnd) {
      throw new Error('Cannot confirm attendance outside the current month.');
    }

    return this.prisma.attendance.update({
      where: { id: attendanceId },
      data: { isConfirmed: true },
    });
  }

  async confirmAllAttendances(userId: number) {
    const attendanceRecords = await this.prisma.attendance.findMany({
      where: { userId },
    });

    const currentMonthStart = dayjs().startOf('month').toDate();
    const currentMonthEnd = dayjs().endOf('month').toDate();

    const recordsInCurrentMonth = attendanceRecords.filter((att) => {
      const checkInDate = new Date(att.checkInAt);
      return checkInDate >= currentMonthStart && checkInDate <= currentMonthEnd;
    });

    if (recordsInCurrentMonth.length === 0) {
      throw new Error('No attendance records found for the current month.');
    }

    const updatedRecords = await this.prisma.attendance.updateMany({
      where: {
        id: {
          in: recordsInCurrentMonth.map((att) => att.id),
        },
      },
      data: { isConfirmed: true },
    });

    return updatedRecords;
  }

  async getUserAttendanceWithSalary(userId: number) {
    return this.prisma.attendance.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            name: true,
            role: true,
            salary: true,
          },
        },
      },
    });
  }
}

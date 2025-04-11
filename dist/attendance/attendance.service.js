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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const dayjs = require('dayjs');
let AttendanceService = class AttendanceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    shiftTimes = {
        [client_1.Shift.MORNING]: ['07:30', '08:30'],
        [client_1.Shift.AFTERNOON]: ['13:30', '14:30'],
        [client_1.Shift.EVENING]: ['19:00', '20:00'],
        [client_1.Shift.NIGHT]: ['02:00', '07:30'],
    };
    isValidCheckIn(shift) {
        const now = new Date();
        const [start, end] = this.shiftTimes[shift];
        const startTime = new Date();
        const endTime = new Date();
        startTime.setHours(+start.split(':')[0], +start.split(':')[1], 0);
        endTime.setHours(+end.split(':')[0], +end.split(':')[1], 0);
        return now >= startTime && now <= endTime;
    }
    async checkIn(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { shift: true },
        });
        if (!user?.shift)
            throw new common_1.BadRequestException('User không có shift');
        if (!this.isValidCheckIn(user.shift)) {
            throw new common_1.BadRequestException('Không trong thời gian điểm danh hợp lệ!');
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
    async confirmAttendance(attendanceId) {
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
    async confirmAllAttendances(userId) {
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
    async getUserAttendanceWithSalary(userId) {
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
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map
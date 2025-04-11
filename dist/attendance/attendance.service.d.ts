import { PrismaService } from '../prisma/prisma.service';
export declare class AttendanceService {
    private prisma;
    constructor(prisma: PrismaService);
    private readonly shiftTimes;
    private isValidCheckIn;
    checkIn(userId: number): Promise<{
        shift: import(".prisma/client").$Enums.Shift;
        id: number;
        userId: number;
        checkInAt: Date;
        isConfirmed: boolean;
    }>;
    getAllAttendance(): Promise<({
        user: {
            name: string;
            role: import(".prisma/client").$Enums.Role;
        };
    } & {
        shift: import(".prisma/client").$Enums.Shift;
        id: number;
        userId: number;
        checkInAt: Date;
        isConfirmed: boolean;
    })[]>;
    confirmAttendance(attendanceId: number): Promise<{
        shift: import(".prisma/client").$Enums.Shift;
        id: number;
        userId: number;
        checkInAt: Date;
        isConfirmed: boolean;
    }>;
    confirmAllAttendances(userId: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getUserAttendanceWithSalary(userId: number): Promise<({
        user: {
            name: string;
            salary: number | null;
            role: import(".prisma/client").$Enums.Role;
        };
    } & {
        shift: import(".prisma/client").$Enums.Shift;
        id: number;
        userId: number;
        checkInAt: Date;
        isConfirmed: boolean;
    })[]>;
}

import { AttendanceService } from './attendance.service';
export declare class AttendanceController {
    private attendanceService;
    constructor(attendanceService: AttendanceService);
    checkIn(id: string): Promise<{
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
    confirmAttendance(id: string): Promise<{
        shift: import(".prisma/client").$Enums.Shift;
        id: number;
        userId: number;
        checkInAt: Date;
        isConfirmed: boolean;
    }>;
    confirmAll(id: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getUserAttendance(req: any): Promise<({
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

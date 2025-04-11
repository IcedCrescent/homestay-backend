import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '@prisma/client';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto, currentUserRole: Role): Promise<{
        name: string;
        email: string;
        image: string | null;
        salary: number | null;
        role: import(".prisma/client").$Enums.Role;
        phone: string | null;
        shift: import(".prisma/client").$Enums.Shift | null;
        isMale: boolean;
        password: string;
        id: number;
        createdAt: Date;
        remainDayOff: number | null;
        spent: number | null;
    }>;
    update(userId: number, updateData: Partial<CreateUserDto>, currentUserId: number, currentUserRole: Role): Promise<{
        name: string;
        email: string;
        image: string | null;
        salary: number | null;
        role: import(".prisma/client").$Enums.Role;
        phone: string | null;
        shift: import(".prisma/client").$Enums.Shift | null;
        isMale: boolean;
        id: number;
        createdAt: Date;
        remainDayOff: number | null;
        spent: number | null;
    }>;
    delete(userId: number): Promise<{
        message: string;
    }>;
    findAll(): Promise<{
        name: string;
        email: string;
        image: string | null;
        salary: number | null;
        role: import(".prisma/client").$Enums.Role;
        phone: string | null;
        shift: import(".prisma/client").$Enums.Shift | null;
        isMale: boolean;
        id: number;
        createdAt: Date;
        remainDayOff: number | null;
        spent: number | null;
    }[]>;
    findById(userId: number): Promise<{
        name: string;
        email: string;
        image: string | null;
        salary: number | null;
        role: import(".prisma/client").$Enums.Role;
        phone: string | null;
        shift: import(".prisma/client").$Enums.Shift | null;
        isMale: boolean;
        id: number;
        createdAt: Date;
        remainDayOff: number | null;
        spent: number | null;
    }>;
    updateOwnInfo(userId: number, updateData: Partial<CreateUserDto> & {
        oldPassword?: string;
        newPassword?: string;
    }): Promise<{
        name: string;
        email: string;
        image: string | null;
        salary: number | null;
        role: import(".prisma/client").$Enums.Role;
        phone: string | null;
        shift: import(".prisma/client").$Enums.Shift | null;
        isMale: boolean;
        id: number;
        createdAt: Date;
        remainDayOff: number | null;
        spent: number | null;
    }>;
}

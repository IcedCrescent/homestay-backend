import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/types/express';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    signup(data: {
        name: string;
        email: string;
        password: string;
        role: string;
        isMale: boolean;
    }): Promise<{
        user: {
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
        };
        token: string;
    }>;
    login(email: string, password: string): Promise<{
        user: {
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
        };
        token: string;
    }>;
    verifyJwt(token: string): Promise<JwtPayload>;
    private generateToken;
}

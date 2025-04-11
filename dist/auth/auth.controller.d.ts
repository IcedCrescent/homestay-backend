import { AuthService } from './auth.service';
import { LoginDto } from 'src/user/dto/login.dto';
import { SignUpDto } from 'src/user/dto/sign-up.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(body: SignUpDto): Promise<{
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
    login(body: LoginDto): Promise<{
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
}

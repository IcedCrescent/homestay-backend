import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto, req: any): Promise<{
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
    delete(id: string): Promise<{
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
    findById(id: string): Promise<{
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
    findMe(id: string): Promise<{
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
    update(id: string, updateData: Record<string, unknown>, req: any): Promise<{
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
    updateOwnInfo(updateData: Partial<CreateUserDto>, id: string): Promise<{
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

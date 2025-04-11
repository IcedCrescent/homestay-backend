import { Role, Shift } from '@prisma/client';
export declare class CreateUserDto {
    name: string;
    email: string;
    image?: string;
    salary?: number;
    role: Role;
    phone?: string;
    shift?: Shift;
    isMale: boolean;
    password: string;
}

import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
export declare class TransactionService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateTransactionDto): Promise<{
        id: number;
        createdAt: Date;
        type: import(".prisma/client").$Enums.TransactionType;
        description: string | null;
        status: import(".prisma/client").$Enums.TransactionStatus;
        user_id: number;
        amount: number;
        reason: import(".prisma/client").$Enums.TransactionReason;
        bill_image: string | null;
        confirm_by: number | null;
    }>;
    getAll(): Promise<{
        user: {
            name: string;
        };
        id: number;
        type: import(".prisma/client").$Enums.TransactionType;
        description: string | null;
        status: import(".prisma/client").$Enums.TransactionStatus;
        user_id: number;
        amount: number;
        reason: import(".prisma/client").$Enums.TransactionReason;
        bill_image: string | null;
        confirm_by: number | null;
    }[]>;
    confirm(id: number, confirmBy: number): Promise<{
        id: number;
        createdAt: Date;
        type: import(".prisma/client").$Enums.TransactionType;
        description: string | null;
        status: import(".prisma/client").$Enums.TransactionStatus;
        user_id: number;
        amount: number;
        reason: import(".prisma/client").$Enums.TransactionReason;
        bill_image: string | null;
        confirm_by: number | null;
    }>;
    reject(id: number, reason: string): Promise<{
        id: number;
        createdAt: Date;
        type: import(".prisma/client").$Enums.TransactionType;
        description: string | null;
        status: import(".prisma/client").$Enums.TransactionStatus;
        user_id: number;
        amount: number;
        reason: import(".prisma/client").$Enums.TransactionReason;
        bill_image: string | null;
        confirm_by: number | null;
    }>;
}

import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ConfirmTransactionDto } from './dto/confirm-transaction.dto';
import { RejectTransactionDto } from './dto/reject-transaction.dto';
export declare class TransactionController {
    private transactionService;
    constructor(transactionService: TransactionService);
    create(createTransactionDto: CreateTransactionDto): Promise<{
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
    confirm(id: string, confirmTransactionDto: ConfirmTransactionDto): Promise<{
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
    reject(id: string, rejectTransactionDto: RejectTransactionDto): Promise<{
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

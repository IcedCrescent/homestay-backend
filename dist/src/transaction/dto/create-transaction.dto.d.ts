import { TransactionType, TransactionReason, TransactionStatus } from '@prisma/client';
export declare class CreateTransactionDto {
    amount: number;
    type: TransactionType;
    status?: TransactionStatus;
    user_id: number;
    description?: string;
    reason: TransactionReason;
    bill_image?: string;
}

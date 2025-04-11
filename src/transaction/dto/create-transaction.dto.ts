import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';
import {
  TransactionType,
  TransactionReason,
  TransactionStatus,
} from '@prisma/client';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @IsEnum(TransactionStatus)
  @IsOptional()
  status?: TransactionStatus;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TransactionReason)
  @IsNotEmpty()
  reason: TransactionReason;

  @IsString()
  @IsOptional()
  bill_image?: string;
}

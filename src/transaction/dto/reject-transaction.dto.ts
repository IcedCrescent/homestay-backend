import { IsNotEmpty, IsString } from 'class-validator';

export class RejectTransactionDto {
  @IsString()
  @IsNotEmpty()
  reason: string;
}

import { IsNumber } from 'class-validator';

export class ConfirmTransactionDto {
  @IsNumber()
  confirmBy: number;
}

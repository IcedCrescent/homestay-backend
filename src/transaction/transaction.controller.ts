import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ConfirmTransactionDto } from './dto/confirm-transaction.dto';
import { RejectTransactionDto } from './dto/reject-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  async getAll() {
    return this.transactionService.getAll();
  }

  @Patch(':id/confirm')
  async confirm(
    @Param('id') id: string,
    @Body() confirmTransactionDto: ConfirmTransactionDto,
  ) {
    return this.transactionService.confirm(
      Number(id),
      confirmTransactionDto.confirmBy,
    );
  }

  @Patch(':id/reject')
  async reject(
    @Param('id') id: string,
    @Body() rejectTransactionDto: RejectTransactionDto,
  ) {
    return this.transactionService.reject(
      Number(id),
      rejectTransactionDto.reason,
    );
  }
}

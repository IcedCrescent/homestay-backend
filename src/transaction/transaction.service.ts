import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionStatus } from '@prisma/client';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data,
    });
  }

  async getAll() {
    return this.prisma.transaction.findMany({
      select: {
        type: true,
        amount: true,
        status: true,
        reason: true,
        description: true,
        bill_image: true,
        user_id: true,
        confirm_by: true,
        id: true,
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async confirm(id: number, confirmBy: number) {
    // Find the transaction
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) throw new NotFoundException('Transaction not found');

    const updatedTransaction = await this.prisma.transaction.update({
      where: { id },
      data: {
        status: TransactionStatus.CONFIRMED,
        confirm_by: confirmBy === 0 ? null : confirmBy,
      },
    });

    await this.prisma.user.update({
      where: { id: transaction.user_id },
      data: {
        spent: {
          increment: transaction.amount, // Add amount to spent
        },
      },
    });

    return updatedTransaction;
  }

  async reject(id: number, reason: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) throw new NotFoundException('Transaction not found');

    return this.prisma.transaction.update({
      where: { id },
      data: {
        status: TransactionStatus.REJECTED,
        description: reason,
      },
    });
  }
}

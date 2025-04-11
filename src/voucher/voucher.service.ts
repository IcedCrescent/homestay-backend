import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVoucherDto, UpdateVoucherDto } from './dto/voucher.dto';

@Injectable()
export class VoucherService {
  constructor(private prisma: PrismaService) {}

  // Create a voucher
  async create(data: CreateVoucherDto) {
    return this.prisma.voucher.create({
      data,
    });
  }

  // Get all vouchers
  async getAll() {
    return this.prisma.voucher.findMany({
      include: {
        roomClass: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  // Get voucher by code
  async getByCode(code: string) {
    const voucher = await this.prisma.voucher.findUnique({
      where: { code },
    });
    if (!voucher) throw new NotFoundException('Voucher not found');
    return voucher;
  }

  // Get vouchers with start date after the input date
  async getByFrom(from: Date) {
    return this.prisma.voucher.findMany({
      where: {
        from: {
          gte: from,
        },
      },
    });
  }

  // Get vouchers with end date before the input date
  async getByTo(to: Date) {
    return this.prisma.voucher.findMany({
      where: {
        to: {
          lte: to,
        },
      },
    });
  }

  // Get vouchers with `minSpend` greater than input value
  async getByMinSpend(minSpend: number) {
    return this.prisma.voucher.findMany({
      where: {
        minSpend: {
          gte: minSpend,
        },
      },
    });
  }

  // Update voucher by ID
  async update(id: number, data: UpdateVoucherDto) {
    const voucher = await this.prisma.voucher.findUnique({
      where: { id },
    });
    if (!voucher) throw new NotFoundException('Voucher not found');

    return this.prisma.voucher.update({
      where: { id },
      data,
    });
  }

  // Delete voucher by ID
  async delete(id: number) {
    const voucher = await this.prisma.voucher.findUnique({
      where: { id },
    });
    if (!voucher) throw new NotFoundException('Voucher not found');

    return this.prisma.voucher.delete({
      where: { id },
    });
  }
}

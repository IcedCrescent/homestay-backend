import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto, UpdateVoucherDto } from './dto/voucher.dto';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  // Create voucher
  @Post()
  async create(@Body() data: CreateVoucherDto) {
    return this.voucherService.create(data);
  }

  // Get all vouchers
  @Get()
  async getAll() {
    return this.voucherService.getAll();
  }

  // Get voucher by code
  @Get('/code/:code')
  async getByCode(@Param('code') code: string) {
    return this.voucherService.getByCode(code);
  }

  // Get vouchers with start date after the input date
  @Get('/from')
  async getByFrom(@Query('from') from: string) {
    return this.voucherService.getByFrom(new Date(from));
  }

  // Get vouchers with end date before the input date
  @Get('/to')
  async getByTo(@Query('to') to: string) {
    return this.voucherService.getByTo(new Date(to));
  }

  // Get vouchers with minSpend greater than the input value
  @Get('/min-spend')
  async getByMinSpend(@Query('minSpend') minSpend: string) {
    return this.voucherService.getByMinSpend(Number(minSpend));
  }

  // Update voucher by ID
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() data: UpdateVoucherDto) {
    return this.voucherService.update(Number(id), data);
  }

  // Delete voucher by ID
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.voucherService.delete(Number(id));
  }
}

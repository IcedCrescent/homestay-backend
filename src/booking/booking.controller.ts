/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Delete,
  Param,
  Get,
  Patch,
  HttpException,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { AuthGuard } from '../auth/auth.guard';
import { Roles, RolesGuard } from '../auth/roles.guard';
import { Role } from '@prisma/client';
import { BookingStatus } from './constants';
import { CreateBookingDto } from './dto/create.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(
    @Body()
    data: CreateBookingDto,
    @Request()
    req: {
      user: {
        userId: number;
      };
    },
  ) {
    try {
      const payload = {
        ...data,
        status: BookingStatus.PENDING,
      };

      return await this.bookingService.create(payload);
    } catch (error) {
      console.error(error);
      if (error.message === 'Room is not available') {
        throw new HttpException(
          { message: 'Phòng hiện không sẵn sàng', success: false },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (error.message === 'Room not found') {
        throw new HttpException(
          { message: 'Không tìm thấy phòng này', success: false },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        { message: error.message || 'Lỗi server', success: false },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Roles(Role.MANAGER, Role.OWNER, Role.ACCOUNTANT)
  @UseGuards(RolesGuard)
  @Get()
  async findAll() {
    return this.bookingService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get(':userId')
  async findByUserId(@Param('userId') userId: string, @Request() req) {
    return this.bookingService.getByUserId(Number(userId));
  }

  @UseGuards(AuthGuard)
  @Get('user-bookings/:id')
  async findUserBookingById(@Param('id') id: string, @Request() req) {
    return this.bookingService.getUserBookingById(Number(id));
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateStatus(
    @Param('id') id: string,
    @Body() data: { status: number },
    @Request() req,
  ) {
    return this.bookingService.updateStatus(Number(id), {
      status: data.status,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async cancel(@Param('id') id: string, @Request() req) {
    return this.bookingService.cancel(Number(id));
  }
}

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create.dto';
import { UpdateBookingDto } from './dto/update.dto';
import { BookingStatus } from './constants';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createBookingPayload: CreateBookingDto & {
      status: BookingStatus;
      user_id: number;
    },
  ) {
    const rooms = await this.prisma.room.findMany({
      where: {
        id: {
          in: createBookingPayload.room_ids,
        },
        status: {
          equals: true,
        },
      },
      select: {
        id: true,
        roomClass: {
          select: {
            price: true,
          },
        },
      },
    });

    // Find rooms that do not exist
    const foundRoomIds = rooms.map((room) => room.id);
    const notFoundRoomIds = createBookingPayload.room_ids.filter(
      (id) => !foundRoomIds.includes(id),
    );

    if (notFoundRoomIds.length > 0) {
      throw new Error(`Room(s) not found: ${notFoundRoomIds.join(', ')}`);
    }

    // Check for overlapping bookings
    const overlappingBookings = await this.prisma.roomBooking.findMany({
      where: {
        room_id: {
          in: createBookingPayload.room_ids,
        },
        booking: {
          AND: [
            { from: { lte: createBookingPayload.to } },
            { to: { gte: createBookingPayload.from } },
          ],
        },
      },
      select: { room_id: true, booking: true },
    });

    if (
      overlappingBookings.filter(
        (booking) =>
          booking.booking.status === BookingStatus.CONFIRMED ||
          booking.booking.status === BookingStatus.PENDING,
      ).length > 0
    ) {
      throw new Error(`Phòng này đã được đặt!`);
    }

    return this.prisma.booking.create({
      data: {
        user: {
          connect: {
            id:
              createBookingPayload.user_id === -1
                ? 3
                : createBookingPayload.user_id,
          },
        },
        roomBookings: {
          create: rooms.map((room) => ({
            room: { connect: { id: room.id } },
            booked_price: room.roomClass.price,
          })),
        },
        userBookings: {
          create: createBookingPayload.user_bookings,
        },
        deposit: createBookingPayload.deposit,
        from: createBookingPayload.from,
        to: createBookingPayload.to,
        status: createBookingPayload.status,
        transaction: createBookingPayload.transaction_id
          ? { connect: { id: createBookingPayload.transaction_id } }
          : undefined,
      },
    });
  }

  async getAll() {
    return this.prisma.booking.findMany({
      select: {
        id: true,
        status: true,
        deposit: true,
        from: true,
        to: true,
        transaction_id: true,
        user_id: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        roomBookings: {
          select: {
            room: {
              select: {
                id: true,
                name: true,
                roomClass: {
                  select: {
                    price: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async getUserBookingById(id: number) {
    return this.prisma.userBooking.findMany({
      where: {
        booking_id: id,
      },
    });
  }

  async getByUserId(userId: number) {
    return this.prisma.booking.findMany({
      select: {
        id: true,
        status: true,
        deposit: true,
        from: true,
        to: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        roomBookings: {
          select: {
            room: {
              select: {
                id: true,
                name: true,
                roomClass: {
                  select: {
                    price: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
      where: {
        user_id: userId,
      },
    });
  }

  async updateStatus(id: number, updateBookingDto: UpdateBookingDto) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) throw new NotFoundException('Booking not found');

    const updatedBooking = await this.prisma.booking.update({
      where: { id },
      data: {
        status: updateBookingDto.status,
      },
    });

    return updatedBooking;
  }

  async cancel(id: number) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) throw new NotFoundException('Booking not found');

    const canceledBooking = await this.prisma.booking.update({
      where: { id },
      data: {
        status: BookingStatus.CANCEL,
      },
    });

    return canceledBooking;
  }
}

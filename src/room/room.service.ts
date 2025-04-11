import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { BookingStatus } from 'src/booking/constants';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRoomDto) {
    const roomName = data.name;

    if (
      !roomName ||
      !/^[1-9]\d{2}$/.test(roomName) ||
      /^.[0]{2}$/.test(roomName)
    ) {
      throw new Error('Invalid room name');
    }

    return this.prisma.room.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.room.findMany({
      include: { roomClass: true },
    });
  }

  async findAvailable(startDate: Date, endDate: Date) {
    if (startDate > endDate) {
      throw new Error('Invalid date range');
    }

    return this.prisma.room.findMany({
      where: {
        status: {
          equals: true,
        },
        NOT: {
          RoomBooking: {
            some: {
              booking: {
                from: { lte: endDate },
                to: { gte: startDate },
                status: {
                  in: [BookingStatus.CONFIRMED, BookingStatus.PENDING],
                },
              },
            },
          },
        },
      },
      include: { roomClass: true },
    });
  }

  async findById(id: number) {
    const room = await this.prisma.room.findUnique({
      where: { id },
      include: { roomClass: true },
    });

    if (!room) throw new NotFoundException(`Room with id ${id} not found`);
    return room;
  }

  async update(id: number, data: UpdateRoomDto) {
    const room = await this.prisma.room.findUnique({
      where: { id },
    });

    if (!room) throw new NotFoundException(`Room with id ${id} not found`);

    return this.prisma.room.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    const room = await this.prisma.room.findUnique({
      where: { id },
    });

    if (!room) throw new NotFoundException(`Room with id ${id} not found`);

    return this.prisma.room.delete({
      where: { id },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingServiceService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll() {
        return this.prisma.bookingService.findMany();
    }
}

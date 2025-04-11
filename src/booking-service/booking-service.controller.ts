import { Controller, Get, UseGuards } from '@nestjs/common';
import { BookingServiceService } from './booking-service.service';
import { Roles, RolesGuard } from 'src/auth/roles.guard';
import { Role } from '@prisma/client';

@Controller('booking-service')
export class BookingServiceController {
    constructor(private readonly bookingService: BookingServiceService) {}

    @Roles(Role.MANAGER, Role.OWNER, Role.ACCOUNTANT)
    @UseGuards(RolesGuard)
    @Get()
    async findAll() {
        return this.bookingService.getAll();
    }
}

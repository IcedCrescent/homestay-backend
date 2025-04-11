"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const constants_1 = require("./constants");
let BookingService = class BookingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBookingPayload) {
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
        const foundRoomIds = rooms.map((room) => room.id);
        const notFoundRoomIds = createBookingPayload.room_ids.filter((id) => !foundRoomIds.includes(id));
        if (notFoundRoomIds.length > 0) {
            throw new Error(`Room(s) not found: ${notFoundRoomIds.join(', ')}`);
        }
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
        if (overlappingBookings.filter((booking) => booking.booking.status === constants_1.BookingStatus.CONFIRMED ||
            booking.booking.status === constants_1.BookingStatus.PENDING).length > 0) {
            throw new Error(`Phòng này đã được đặt!`);
        }
        return this.prisma.booking.create({
            data: {
                user: {
                    connect: {
                        id: createBookingPayload.user_id === -1
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
    async getUserBookingById(id) {
        return this.prisma.userBooking.findMany({
            where: {
                booking_id: id,
            },
        });
    }
    async getByUserId(userId) {
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
    async updateStatus(id, updateBookingDto) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
        });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        const updatedBooking = await this.prisma.booking.update({
            where: { id },
            data: {
                status: updateBookingDto.status,
            },
        });
        return updatedBooking;
    }
    async cancel(id) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
        });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        const canceledBooking = await this.prisma.booking.update({
            where: { id },
            data: {
                status: constants_1.BookingStatus.CANCEL,
            },
        });
        return canceledBooking;
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingService);
//# sourceMappingURL=booking.service.js.map
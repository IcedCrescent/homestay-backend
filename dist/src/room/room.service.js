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
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const constants_1 = require("../booking/constants");
let RoomService = class RoomService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const roomName = data.name;
        if (!roomName ||
            !/^[1-9]\d{2}$/.test(roomName) ||
            /^.[0]{2}$/.test(roomName)) {
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
    async findAvailable(startDate, endDate) {
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
                                    in: [constants_1.BookingStatus.CONFIRMED, constants_1.BookingStatus.PENDING],
                                },
                            },
                        },
                    },
                },
            },
            include: { roomClass: true },
        });
    }
    async findById(id) {
        const room = await this.prisma.room.findUnique({
            where: { id },
            include: { roomClass: true },
        });
        if (!room)
            throw new common_1.NotFoundException(`Room with id ${id} not found`);
        return room;
    }
    async update(id, data) {
        const room = await this.prisma.room.findUnique({
            where: { id },
        });
        if (!room)
            throw new common_1.NotFoundException(`Room with id ${id} not found`);
        return this.prisma.room.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        const room = await this.prisma.room.findUnique({
            where: { id },
        });
        if (!room)
            throw new common_1.NotFoundException(`Room with id ${id} not found`);
        return this.prisma.room.delete({
            where: { id },
        });
    }
};
exports.RoomService = RoomService;
exports.RoomService = RoomService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoomService);
//# sourceMappingURL=room.service.js.map
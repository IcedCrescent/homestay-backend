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
exports.VoucherService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let VoucherService = class VoucherService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.voucher.create({
            data,
        });
    }
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
    async getByCode(code) {
        const voucher = await this.prisma.voucher.findUnique({
            where: { code },
        });
        if (!voucher)
            throw new common_1.NotFoundException('Voucher not found');
        return voucher;
    }
    async getByFrom(from) {
        return this.prisma.voucher.findMany({
            where: {
                from: {
                    gte: from,
                },
            },
        });
    }
    async getByTo(to) {
        return this.prisma.voucher.findMany({
            where: {
                to: {
                    lte: to,
                },
            },
        });
    }
    async getByMinSpend(minSpend) {
        return this.prisma.voucher.findMany({
            where: {
                minSpend: {
                    gte: minSpend,
                },
            },
        });
    }
    async update(id, data) {
        const voucher = await this.prisma.voucher.findUnique({
            where: { id },
        });
        if (!voucher)
            throw new common_1.NotFoundException('Voucher not found');
        return this.prisma.voucher.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        const voucher = await this.prisma.voucher.findUnique({
            where: { id },
        });
        if (!voucher)
            throw new common_1.NotFoundException('Voucher not found');
        return this.prisma.voucher.delete({
            where: { id },
        });
    }
};
exports.VoucherService = VoucherService;
exports.VoucherService = VoucherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VoucherService);
//# sourceMappingURL=voucher.service.js.map
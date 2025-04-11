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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let TransactionService = class TransactionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.transaction.create({
            data,
        });
    }
    async getAll() {
        return this.prisma.transaction.findMany({
            select: {
                type: true,
                amount: true,
                status: true,
                reason: true,
                description: true,
                bill_image: true,
                user_id: true,
                confirm_by: true,
                id: true,
                user: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: {
                id: 'desc',
            },
        });
    }
    async confirm(id, confirmBy) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { id },
        });
        if (!transaction)
            throw new common_1.NotFoundException('Transaction not found');
        const updatedTransaction = await this.prisma.transaction.update({
            where: { id },
            data: {
                status: client_1.TransactionStatus.CONFIRMED,
                confirm_by: confirmBy === 0 ? null : confirmBy,
            },
        });
        await this.prisma.user.update({
            where: { id: transaction.user_id },
            data: {
                spent: {
                    increment: transaction.amount,
                },
            },
        });
        return updatedTransaction;
    }
    async reject(id, reason) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { id },
        });
        if (!transaction)
            throw new common_1.NotFoundException('Transaction not found');
        return this.prisma.transaction.update({
            where: { id },
            data: {
                status: client_1.TransactionStatus.REJECTED,
                description: reason,
            },
        });
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map
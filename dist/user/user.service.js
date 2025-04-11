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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto, currentUserRole) {
        if (currentUserRole !== client_1.Role.MANAGER && currentUserRole !== client_1.Role.OWNER) {
            throw new common_1.ForbiddenException('You do not have permission to create a user');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                ...createUserDto,
                password: hashedPassword,
            },
        });
        return user;
    }
    async update(userId, updateData, currentUserId, currentUserRole) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const managerFields = ['salary', 'role', 'shift', 'remainDayOff'];
        const userFields = ['name', 'image', 'phone', 'isMale', 'spent'];
        if (currentUserRole === client_1.Role.MANAGER || currentUserRole === client_1.Role.OWNER) {
            updateData = Object.fromEntries(Object.entries(updateData).filter(([key]) => [...managerFields, ...userFields].includes(key)));
        }
        else {
            if (user.id !== currentUserId) {
                throw new common_1.ForbiddenException('You do not have permission to update this user');
            }
            updateData = Object.fromEntries(Object.entries(updateData).filter(([key]) => userFields.includes(key)));
        }
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: updateData,
        });
        const { password, ...userWithoutPassword } = updatedUser;
        return userWithoutPassword;
    }
    async delete(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.prisma.user.delete({
            where: { id: userId },
        });
        return { message: 'User deleted successfully' };
    }
    async findAll() {
        return await this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                createdAt: true,
                salary: true,
                role: true,
                phone: true,
                shift: true,
                isMale: true,
                remainDayOff: true,
                spent: true,
            },
        });
    }
    async findById(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                createdAt: true,
                salary: true,
                role: true,
                phone: true,
                shift: true,
                isMale: true,
                remainDayOff: true,
                spent: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async updateOwnInfo(userId, updateData) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (updateData.newPassword) {
            if (!updateData.oldPassword) {
                throw new common_1.BadRequestException('Old password is required');
            }
            const isOldPasswordValid = await bcrypt.compare(updateData.oldPassword, user.password);
            if (!isOldPasswordValid) {
                throw new common_1.ForbiddenException('Old password is incorrect');
            }
            updateData.password = await bcrypt.hash(updateData.newPassword, 10);
            delete updateData.oldPassword;
            delete updateData.newPassword;
        }
        const allowedFields = ['name', 'image', 'phone', 'isMale', 'password'];
        updateData = Object.fromEntries(Object.entries(updateData).filter(([key]) => allowedFields.includes(key)));
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: updateData,
        });
        const { password, ...userWithoutPassword } = updatedUser;
        return userWithoutPassword;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map
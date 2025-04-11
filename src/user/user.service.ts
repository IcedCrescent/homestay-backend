/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto, currentUserRole: Role) {
    if (currentUserRole !== Role.MANAGER && currentUserRole !== Role.OWNER) {
      throw new ForbiddenException(
        'You do not have permission to create a user',
      );
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

  async update(
    userId: number,
    updateData: Partial<CreateUserDto>,
    currentUserId: number,
    currentUserRole: Role,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const managerFields = ['salary', 'role', 'shift', 'remainDayOff'];

    const userFields = ['name', 'image', 'phone', 'isMale', 'spent'];

    if (currentUserRole === Role.MANAGER || currentUserRole === Role.OWNER) {
      updateData = Object.fromEntries(
        Object.entries(updateData).filter(([key]) =>
          [...managerFields, ...userFields].includes(key),
        ),
      );
    } else {
      if (user.id !== currentUserId) {
        throw new ForbiddenException(
          'You do not have permission to update this user',
        );
      }

      updateData = Object.fromEntries(
        Object.entries(updateData).filter(([key]) => userFields.includes(key)),
      );
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    const { password, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  }

  async delete(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
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

  async findById(userId: number) {
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
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateOwnInfo(
    userId: number,
    updateData: Partial<CreateUserDto> & {
      oldPassword?: string;
      newPassword?: string;
    },
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateData.newPassword) {
      if (!updateData.oldPassword) {
        throw new BadRequestException('Old password is required');
      }

      // Validate old password
      const isOldPasswordValid = await bcrypt.compare(
        updateData.oldPassword,
        user.password,
      );

      if (!isOldPasswordValid) {
        throw new ForbiddenException('Old password is incorrect');
      }

      // Hash the new password
      updateData.password = await bcrypt.hash(updateData.newPassword, 10);
      delete updateData.oldPassword;
      delete updateData.newPassword;
    }

    const allowedFields = ['name', 'image', 'phone', 'isMale', 'password'];
    updateData = Object.fromEntries(
      Object.entries(updateData).filter(([key]) => allowedFields.includes(key)),
    );

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    const { password, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  }
}

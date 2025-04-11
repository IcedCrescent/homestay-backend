/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Delete,
  Param,
  Get,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Roles, RolesGuard } from 'src/auth/roles.guard';
import { Role } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Request() req) {
    const currentUserRole = req.user.role;
    return this.userService.create(createUserDto, currentUserRole);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(Number(id));
  }

  @Roles(Role.MANAGER, Role.OWNER, Role.ACCOUNTANT)
  @UseGuards(RolesGuard)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(Number(id));
  }

  @UseGuards(AuthGuard)
  @Get('me/:id')
  async findMe(@Param('id') id: string) {
    return this.userService.findById(Number(id));
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Record<string, unknown>,
    @Request() req,
  ) {
    const currentUserId = req.user.userId;
    const currentUserRole = req.user.role;
    return this.userService.update(
      Number(id),
      updateData,
      currentUserId,
      currentUserRole,
    );
  }

  @UseGuards(AuthGuard)
  @Patch('me/:id')
  async updateOwnInfo(
    @Body() updateData: Partial<CreateUserDto>,
    @Param('id') id: string,
  ) {
    return this.userService.updateOwnInfo(Number(id), updateData);
  }
}

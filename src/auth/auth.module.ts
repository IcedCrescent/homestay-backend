import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService, AuthGuard],
  exports: [AuthService],
})
export class AuthModule {}

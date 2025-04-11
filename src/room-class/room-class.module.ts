import { Module } from '@nestjs/common';
import { RoomClassService } from './room-class.service';
import { RoomClassController } from './room-class.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [RoomClassController],
  providers: [RoomClassService, PrismaService],
})
export class RoomClassModule {}

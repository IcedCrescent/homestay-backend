import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('attendance')
@UseGuards(AuthGuard)
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Post('check-in/:id')
  async checkIn(@Param('id') id: string) {
    return this.attendanceService.checkIn(Number(id));
  }

  @Get('all')
  async getAllAttendance() {
    return this.attendanceService.getAllAttendance();
  }

  @Patch('confirm/:id')
  async confirmAttendance(@Param('id') id: string) {
    return this.attendanceService.confirmAttendance(Number(id));
  }

  @Patch('confirm-all/:id')
  async confirmAll(@Param('id') id: string) {
    return this.attendanceService.confirmAllAttendances(Number(id));
  }

  @Get('user')
  async getUserAttendance(@Request() req) {
    const userId = req.user.userId;
    return this.attendanceService.getUserAttendanceWithSalary(userId);
  }
}

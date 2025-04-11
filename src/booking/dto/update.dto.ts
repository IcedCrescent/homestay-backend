import { IsInt } from 'class-validator';

export class UpdateBookingDto {
  @IsInt()
  status: number;
}

import {
  IsInt,
  IsNumber,
  IsDate,
  IsOptional,
  IsArray,
  IsString,
  IsNotEmpty,
  ArrayNotEmpty,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UserBookingDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  identity_card_number: string;
}

export class CreateBookingDto {
  @IsArray()
  @IsNumber({}, { each: true })
  room_ids: number[];

  @IsNumber({}, { each: true })
  user_id: number;

  @IsNumber()
  deposit: number;

  @IsDateString()
  from: string;

  @IsDateString()
  to: string;

  @IsOptional()
  @IsInt()
  transaction_id?: number;

  @IsArray()
  @ArrayNotEmpty()
  @Type(() => UserBookingDto)
  @ValidateNested()
  user_bookings: UserBookingDto[];
}

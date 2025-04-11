import { Type } from 'class-transformer';
import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

export class CreateVoucherDto {
  @IsString()
  code: string;

  @IsNumber()
  discount: number;

  @IsNumber()
  minSpend: number;

  @Type(() => Date)
  @IsDate()
  from: Date;

  @Type(() => Date)
  @IsDate()
  to: Date;

  @IsNumber()
  room_class_id: number;
}

export class UpdateVoucherDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsNumber()
  minSpend?: number;

  @IsOptional()
  @IsDate()
  from?: Date;

  @IsOptional()
  @IsDate()
  to?: Date;

  @IsOptional()
  @IsNumber()
  room_class_id?: number;
}

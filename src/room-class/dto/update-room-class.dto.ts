import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRoomClassDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  images?: string;

  @IsNotEmpty()
  @IsNumber()
  numOfBreakfast: number;

  @IsNotEmpty()
  @IsNumber()
  numBeds: number;

  @IsNotEmpty()
  @IsNumber()
  area: number;

  @IsString()
  view: string;

  @IsString()
  capacity: string;
}

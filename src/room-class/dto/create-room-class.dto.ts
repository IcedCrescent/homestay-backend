import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRoomClassDto {
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

  @IsNotEmpty()
  @IsString()
  view: string;

  @IsNotEmpty()
  @IsString()
  capacity: string;
}

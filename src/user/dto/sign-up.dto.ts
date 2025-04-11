import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsNumber,
} from 'class-validator';
import { Role } from '@prisma/client';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsIn(Object.values(Role))
  role: string;

  @IsNotEmpty()
  @IsBoolean()
  isMale: boolean;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsNumber()
  salary?: number;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsNumber()
  remainDayOff?: number;

  @IsOptional()
  @IsNumber()
  spent?: number;
}

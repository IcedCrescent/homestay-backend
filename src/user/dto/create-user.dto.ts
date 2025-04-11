/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Role, Shift } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsNumber()
  salary?: number;

  @IsEnum(Object.values(Role))
  role: Role;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEnum(Object.values(Shift))
  shift?: Shift;

  @IsBoolean()
  isMale: boolean;

  @IsString()
  password: string;
}

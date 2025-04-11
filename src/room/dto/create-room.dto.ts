import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsBoolean()
  status: boolean;

  @IsInt()
  room_class_id: number;
}

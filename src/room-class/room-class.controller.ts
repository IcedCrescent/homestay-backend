import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
  Res,
} from '@nestjs/common';
import { RoomClassService } from './room-class.service';
import { CreateRoomClassDto } from './dto/create-room-class.dto';
import { UpdateRoomClassDto } from './dto/update-room-class.dto';
import { Readable } from 'node:stream';
import { Request, Response } from 'express';

@Controller('room-class')
export class RoomClassController {
  constructor(private readonly roomClassService: RoomClassService) {}

  // Create new room class
  @Post()
  create(@Body() createRoomClassDto: CreateRoomClassDto) {
    return this.roomClassService.create(createRoomClassDto);
  }

  // Get all room classes
  @Get()
  findAll() {
    return this.roomClassService.findAll();
  }

  // Get a single room class by ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.roomClassService.findOne(id);
  }

  // Update a room class
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoomClassDto: UpdateRoomClassDto,
  ) {
    return this.roomClassService.update(id, updateRoomClassDto);
  }

  @Get(':id/image')
  async getRoomImage(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    this.roomClassService.downloadRoomImage(`room-class/${id}`).pipe(res);
  }

  @Post(':id/image')
  async updateRoomImage(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: Request,
  ) {
    const bytes = await this.streamToBuffer(request);

    const imagePath = `room-class/${id}`;

    await this.roomClassService.uploadRoomImage(imagePath, bytes, {
      metadata: {
        contentType: request.headers['content-type'] as string | undefined,
      },
    });

    await this.roomClassService.update(id, {
      images: imagePath,
    });
  }

  private async streamToBuffer(readable: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      readable.on('data', (chunk) => chunks.push(chunk));
      readable.on('end', () => resolve(Buffer.concat(chunks)));
      readable.on('error', reject);
    });
  }

  // Delete a room class
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roomClassService.remove(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomClassDto } from './dto/create-room-class.dto';
import { UpdateRoomClassDto } from './dto/update-room-class.dto';
import { SaveOptions, Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RoomClassService {
  private storage: Storage;
  private bucketName: string;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.bucketName = this.configService.get<string>('GCP_STORAGE_BUCKET') as string

    this.storage = new Storage({
      credentials: {
        private_key: this.configService
          .get<string>('GCP_STORAGE_PRIVATE_KEY')
          ?.replace(/\\n/g, '\n'),
        client_email: this.configService.get<string>(
          'GCP_STORAGE_CLIENT_EMAIL',
        ),
      },
      projectId: this.configService.get<string>('GCP_STORAGE_PROJECT_ID'),
    });
  }

  // Create a new room class
  async create(data: CreateRoomClassDto) {
    return this.prisma.roomClass.create({
      data,
    });
  }

  // Get all room classes
  async findAll() {
    return this.prisma.roomClass.findMany();
  }

  // Get a single room class by ID
  async findOne(id: number) {
    const roomClass = await this.prisma.roomClass.findUnique({
      where: { id },
    });

    if (!roomClass) {
      throw new NotFoundException(`RoomClass with ID ${id} not found`);
    }

    return roomClass;
  }

  // Update a room class
  async update(id: number, data: Partial<UpdateRoomClassDto>) {
    const roomClass = await this.prisma.roomClass.findUnique({
      where: { id },
    });

    if (!roomClass) {
      throw new NotFoundException(`RoomClass with ID ${id} not found`);
    }

    return this.prisma.roomClass.update({
      where: { id },
      data,
    });
  }

  // Delete a room class
  async remove(id: number) {
    const roomClass = await this.prisma.roomClass.findUnique({
      where: { id },
    });

    if (!roomClass) {
      throw new NotFoundException(`RoomClass with ID ${id} not found`);
    }

    return this.prisma.roomClass.delete({
      where: { id },
    });
  }

  async uploadRoomImage(
    filePath: string,
    data: Uint8Array,
    options?: SaveOptions,
  ) {
    await this.storage.bucket(this.bucketName).file(filePath).save(data, options);
  }

  downloadRoomImage(filePath: string) {
    return this.storage.bucket(this.bucketName).file(filePath).createReadStream();
  }
}

import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomClassDto } from './dto/create-room-class.dto';
import { UpdateRoomClassDto } from './dto/update-room-class.dto';
import { SaveOptions } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';
export declare class RoomClassService {
    private prisma;
    private configService;
    private storage;
    private bucketName;
    constructor(prisma: PrismaService, configService: ConfigService);
    create(data: CreateRoomClassDto): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: number;
        images: string | null;
        numOfBreakfast: number;
        numBeds: number;
        area: number;
        view: string;
        capacity: string;
    }>;
    findAll(): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: number;
        images: string | null;
        numOfBreakfast: number;
        numBeds: number;
        area: number;
        view: string;
        capacity: string;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: number;
        images: string | null;
        numOfBreakfast: number;
        numBeds: number;
        area: number;
        view: string;
        capacity: string;
    }>;
    update(id: number, data: Partial<UpdateRoomClassDto>): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: number;
        images: string | null;
        numOfBreakfast: number;
        numBeds: number;
        area: number;
        view: string;
        capacity: string;
    }>;
    remove(id: number): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: number;
        images: string | null;
        numOfBreakfast: number;
        numBeds: number;
        area: number;
        view: string;
        capacity: string;
    }>;
    uploadRoomImage(filePath: string, data: Uint8Array, options?: SaveOptions): Promise<void>;
    downloadRoomImage(filePath: string): import("stream").Readable;
}

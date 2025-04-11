import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
export declare class RoomService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateRoomDto): Promise<{
        name: string;
        id: number;
        description: string | null;
        status: boolean;
        room_class_id: number;
    }>;
    findAll(): Promise<({
        roomClass: {
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
        };
    } & {
        name: string;
        id: number;
        description: string | null;
        status: boolean;
        room_class_id: number;
    })[]>;
    findAvailable(startDate: Date, endDate: Date): Promise<({
        roomClass: {
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
        };
    } & {
        name: string;
        id: number;
        description: string | null;
        status: boolean;
        room_class_id: number;
    })[]>;
    findById(id: number): Promise<{
        roomClass: {
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
        };
    } & {
        name: string;
        id: number;
        description: string | null;
        status: boolean;
        room_class_id: number;
    }>;
    update(id: number, data: UpdateRoomDto): Promise<{
        name: string;
        id: number;
        description: string | null;
        status: boolean;
        room_class_id: number;
    }>;
    delete(id: number): Promise<{
        name: string;
        id: number;
        description: string | null;
        status: boolean;
        room_class_id: number;
    }>;
}

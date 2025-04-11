import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
export declare class RoomController {
    private readonly roomService;
    constructor(roomService: RoomService);
    create(createRoomDto: CreateRoomDto): Promise<{
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
    findAvailable(from: string, to: string): Promise<({
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
    findById(id: string): Promise<{
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
    update(id: string, updateRoomDto: UpdateRoomDto): Promise<{
        name: string;
        id: number;
        description: string | null;
        status: boolean;
        room_class_id: number;
    }>;
    delete(id: string): Promise<{
        name: string;
        id: number;
        description: string | null;
        status: boolean;
        room_class_id: number;
    }>;
}

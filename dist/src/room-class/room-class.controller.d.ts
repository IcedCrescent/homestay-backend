import { RoomClassService } from './room-class.service';
import { CreateRoomClassDto } from './dto/create-room-class.dto';
import { UpdateRoomClassDto } from './dto/update-room-class.dto';
import { Request, Response } from 'express';
export declare class RoomClassController {
    private readonly roomClassService;
    constructor(roomClassService: RoomClassService);
    create(createRoomClassDto: CreateRoomClassDto): Promise<{
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
    update(id: number, updateRoomClassDto: UpdateRoomClassDto): Promise<{
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
    getRoomImage(id: number, res: Response): Promise<void>;
    updateRoomImage(id: number, request: Request): Promise<void>;
    private streamToBuffer;
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
}

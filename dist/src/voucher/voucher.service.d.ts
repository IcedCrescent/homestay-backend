import { PrismaService } from '../prisma/prisma.service';
import { CreateVoucherDto, UpdateVoucherDto } from './dto/voucher.dto';
export declare class VoucherService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateVoucherDto): Promise<{
        id: number;
        room_class_id: number;
        from: Date;
        to: Date;
        code: string;
        discount: number;
        minSpend: number;
    }>;
    getAll(): Promise<({
        roomClass: {
            name: string;
        };
    } & {
        id: number;
        room_class_id: number;
        from: Date;
        to: Date;
        code: string;
        discount: number;
        minSpend: number;
    })[]>;
    getByCode(code: string): Promise<{
        id: number;
        room_class_id: number;
        from: Date;
        to: Date;
        code: string;
        discount: number;
        minSpend: number;
    }>;
    getByFrom(from: Date): Promise<{
        id: number;
        room_class_id: number;
        from: Date;
        to: Date;
        code: string;
        discount: number;
        minSpend: number;
    }[]>;
    getByTo(to: Date): Promise<{
        id: number;
        room_class_id: number;
        from: Date;
        to: Date;
        code: string;
        discount: number;
        minSpend: number;
    }[]>;
    getByMinSpend(minSpend: number): Promise<{
        id: number;
        room_class_id: number;
        from: Date;
        to: Date;
        code: string;
        discount: number;
        minSpend: number;
    }[]>;
    update(id: number, data: UpdateVoucherDto): Promise<{
        id: number;
        room_class_id: number;
        from: Date;
        to: Date;
        code: string;
        discount: number;
        minSpend: number;
    }>;
    delete(id: number): Promise<{
        id: number;
        room_class_id: number;
        from: Date;
        to: Date;
        code: string;
        discount: number;
        minSpend: number;
    }>;
}

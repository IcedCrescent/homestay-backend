import { VoucherService } from './voucher.service';
import { CreateVoucherDto, UpdateVoucherDto } from './dto/voucher.dto';
export declare class VoucherController {
    private readonly voucherService;
    constructor(voucherService: VoucherService);
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
    getByFrom(from: string): Promise<{
        id: number;
        room_class_id: number;
        from: Date;
        to: Date;
        code: string;
        discount: number;
        minSpend: number;
    }[]>;
    getByTo(to: string): Promise<{
        id: number;
        room_class_id: number;
        from: Date;
        to: Date;
        code: string;
        discount: number;
        minSpend: number;
    }[]>;
    getByMinSpend(minSpend: string): Promise<{
        id: number;
        room_class_id: number;
        from: Date;
        to: Date;
        code: string;
        discount: number;
        minSpend: number;
    }[]>;
    update(id: string, data: UpdateVoucherDto): Promise<{
        id: number;
        room_class_id: number;
        from: Date;
        to: Date;
        code: string;
        discount: number;
        minSpend: number;
    }>;
    delete(id: string): Promise<{
        id: number;
        room_class_id: number;
        from: Date;
        to: Date;
        code: string;
        discount: number;
        minSpend: number;
    }>;
}
